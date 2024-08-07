import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar'; // Asumiendo que Navbar es un componente común
import './styles/ArtistsPage.css'; // Estilos específicos para esta página

// Datos simulados para los artistas
const fetchArtists = async () => {
  // Esta función simula la obtención de datos desde una API.
  // Reemplázalo con una llamada real a tu backend.
  return [
    {
      id: 1,
      name: 'Elton John',
      bio: 'Elton John es un talentoso cantante y compositor britanico con múltiples éxitos...',
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
      website: 'https://janesmithmusic.com',
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

  useEffect(() => {
    const loadArtists = async () => {
      const data = await fetchArtists();
      setArtists(data);
    };

    loadArtists();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="artists-page-container">
        <h1>Artistas</h1>
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
