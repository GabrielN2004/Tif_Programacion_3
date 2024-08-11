import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; 
import './styles/ArtistsPage.css'; // Estilos específicos para esta página
import { useAuth } from "../contexts/AuthContext";

// Datos simulados para los artistas
const fetchArtists = async () => {
  // Esta función simula la obtención de datos desde una API.
  // Reemplázar con una llamada real a backend.
  return [
    {
      id: 1,
      name: 'Elton John',
      bio: 'Elton John es un talentoso cantante y compositor britanico con múltiples éxitos..',
      website: 'https://www.eltonjohn.com/',
      image: 'https://via.placeholder.com/150', // Imagen de ejemplo
      created_at: '2024-01-01T12:00:00Z',
      updated_at: '2024-01-15T12:00:00Z',
      owner: 123,
      songs: [101, 102, 103]
    },
    {
      id: 2,
      name: 'Chayanne',
      bio: 'Elmer Figueroa Arce, más conocido por su nombre artístico Chayanne, es un cantante, compositor, bailarín y actor puertorriqueño.',
      website: 'https://www.sonymusic.es/artista/chayanne/',
      image: 'https://via.placeholder.com/150', // Imagen de ejemplo
      created_at: '2024-02-01T12:00:00Z',
      updated_at: '2024-02-15T12:00:00Z',
      owner: 456,
      songs: [201, 202]
    }
    // Más artistas pueden ser añadidos aquí
  ];
};

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({ name: '', bio: '', website: '' });
  const { token } = useAuth('state') || {} ; // Obtener el token del contexto de autenticación y  Asigna un objeto vacío si el valor es undefined
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  
  useEffect(() => {
    const loadArtists = async () => {
      const data = await fetchArtists();
      setArtists(data);
    };

    loadArtists();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArtist({ ...newArtist, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}api/artists/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newArtist),
      });
      if (!token) {
        console.log("No token found, user might not be authenticated.");
        return <p>El usuario no esta autenticado.</p>;
      }
      if (!response.ok) {
        throw new Error("Error al crear el artista");
      }

      const createdArtist = await response.json();
      setArtists([...artists, createdArtist]);
      setNewArtist({ name: '', bio: '', website: '' }); // Limpiar el formulario
    } catch (error) {
      console.error("Error al crear el artista", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="artists-page-container">
        <h1>Artistas</h1>
        
        <form onSubmit={handleSubmit} className="artist-form">
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input 
                className="input" 
                type="text" 
                name="name" 
                value={newArtist.name} 
                onChange={handleChange} 
                required 
                maxLength="255" 
              />
            </div>
          </div>
          
          <div className="field">
            <label className="label">Biografía</label>
            <div className="control">
              <textarea 
                className="textarea" 
                name="bio" 
                value={newArtist.bio} 
                onChange={handleChange} 
                maxLength="2000"
              />
            </div>
          </div>
          
          <div className="field">
            <label className="label">Página web</label>
            <div className="control">
              <input 
                className="input" 
                type="url" 
                name="website" 
                value={newArtist.website} 
                onChange={handleChange} 
                maxLength="200"
              />
            </div>
          </div>

          <div className="control">
            <button type="submit" className="button is-primary">
              {isLoading ? "Creando..." : "Crear Artista"}
            </button>
          </div>
          
          {isError && <p>Error al crear el artista. Por favor, intente de nuevo.</p>}
        </form>

        <div className="artists-list">
          {artists.map((artist) => (
            <div key={artist.id} className="artist-card">
              {artist.image && (
                <img src={artist.image} alt={artist.name} className="artist-image" />
              )}
              <h2>{artist.name}</h2>
              {artist.bio && <p>{artist.bio}</p>}
              {artist.website && (
                <a href={artist.website} target="_blank" rel="noopener noreferrer">
                  Visita su sitio web
                </a>
              )}
              <p><strong>Creado en:</strong> {new Date(artist.created_at).toLocaleDateString()}</p>
              <p><strong>Actualizado en:</strong> {new Date(artist.updated_at).toLocaleDateString()}</p>
              <p><strong>Propietario:</strong> {artist.owner}</p>
              <p><strong>Canciones:</strong> {artist.songs.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistsPage;
