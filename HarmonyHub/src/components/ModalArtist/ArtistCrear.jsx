import 'bulma/css/bulma.min.css';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export default function ArtistCrear({ isOpenn, onClose }) {
    const { token } = useAuth("state");
    const [submitting, setSubmitting] = useState(false);
    const [loadingArtist, setLoadingArtist] = useState(false);
    const [artistData, setArtistData] = useState({ name: "", bio: "", website: "", image: null });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setArtistData({
            ...artistData,
            [name]: value,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setArtistData({
            ...artistData,
            image: file,
        });
    };

    const handleCrearArtistSubmit = (event) => {
        event.preventDefault();
        if (!submitting && !loadingArtist) {
            setSubmitting(true);
            setLoadingArtist(true);

            const formData = new FormData();
            formData.append("name", artistData.name);
            formData.append("bio", artistData.bio);
            formData.append("website", artistData.website);

            // Si se seleccionó una imagen, añadirla a formData
            if (artistData.image) {
                formData.append("image", artistData.image);
            }

            fetch(`https://sandbox.academiadevelopers.com/harmonyhub/artists/`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${token}`,
                    // No se incluye "Content-Type" para permitir que el navegador establezca las cabeceras correctamente para FormData
                },
                body: formData,
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo crear el artista");
                }
                return response.json();
            })
            .then((data) => {
                alert("Artista creado exitosamente");
            })
            .catch((error) => {
                alert("No se pudo crear el artista: " + error.message);
            })
            .finally(() => {
                setSubmitting(false);
                setLoadingArtist(false);
                onClose(); // Cerrar el modal después de crear el artista
            });
        }
    };

    return (
        <form onSubmit={handleCrearArtistSubmit}>
            <div className={`modal ${isOpenn ? "is-active" : ""}`}>
                <div className="modal-background" onClick={onClose}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Crear Artista</p>
                        <button className="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="file">
                            <label className="label">Nombre</label>
                            <div className="control">
                                <input 
                                    className="input is-rounded is-primary" 
                                    type="text" 
                                    name='name'
                                    value={artistData.name}
                                    onChange={handleInputChange}
                                    required
                                />       
                            </div>
                            <label className="label">Biografía</label>
                            <div className="control">
                                <textarea 
                                    className="textarea is-rounded is-primary"
                                    name='bio'
                                    value={artistData.bio}
                                    onChange={handleInputChange}
                                />
                            </div> 
                            <label className="label">Sitio Web</label>
                            <div className="control">
                                <input 
                                    className="input is-rounded is-primary" 
                                    type="url" 
                                    name='website'
                                    value={artistData.website}
                                    onChange={handleInputChange}
                                /> 
                            </div>
                            <label className="label">Imagen del Artista</label>
                            <div className="control">
                                <input 
                                    className="input is-rounded is-primary" 
                                    type="file" 
                                    accept="image/*" 
                                    name='image'
                                    onChange={handleImageChange}
                                /> 
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <div className="buttons">
                            <button 
                                className="button is-primary" 
                                type="submit" 
                                disabled={submitting}
                            >
                                {submitting ? "Guardando..." : "Guardar"}
                            </button>
                            <button 
                                className="button is-warning" 
                                type="button" 
                                onClick={onClose}
                                disabled={submitting}
                            >
                                Cancelar
                            </button>
                        </div>
                    </footer>
                </div>
            </div>
        </form>
    );
}
