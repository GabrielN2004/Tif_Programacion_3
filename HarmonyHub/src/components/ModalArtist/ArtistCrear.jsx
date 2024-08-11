import 'bulma/css/bulma.min.css';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export default function ArtistCrear({ isOpenn, onClose }) {
    const { token } = useAuth("state");
    const [submitting, setSubmitting] = useState(false);
    const [loadingArtist, setLoadingArtist] = useState(false);
    const [artistData, setArtistData] = useState({ name: "", bio: "", website: "" });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setArtistData({
            ...artistData,
            [name]: value,
        });
    };

    const handleCrearArtistSubmit = (event) => {
        event.preventDefault();
        if (!submitting && !loadingArtist) {    
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("name", artistData.name);
            newForm.append("bio", artistData.bio);
            newForm.append("website", artistData.website);

            fetch(`https://sandbox.academiadevelopers.com/harmonyhub/artists/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm
            }) 
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo crear el artista");
                }
                return response.json();
            })
            .then((data) => {
                alert("Artista creado exitosamente", data);
            })
            .catch((error) => {
                alert("No se pudo crear el artista", error);
            })
            .finally(() => {
                setSubmitting(false);
                setLoadingArtist(false);
            });
        }
    };

    return (
        <form onSubmit={handleCrearArtistSubmit}>
            <div className={`modal ${isOpenn ? "is-active" : ""}`}>
                <div className="modal-background">
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Crear Artista</p>
                            <button className="delete" aria-label="close" onClick={onClose}></button>
                        </header>
                        <section className="modal-card-body">
                            <div className="file">
                                <label className="label">Nombre</label>
                                <div className="control">
                                    <input className="input is-rounded is-primary" 
                                        type="text" 
                                        name='name'
                                        value={artistData.name}
                                        onChange={handleInputChange}
                                    />       
                                </div>
                                <label className="label">Biografía</label>
                                <div className="control">
                                    <textarea className="textarea is-rounded is-primary"
                                        name='bio'
                                        value={artistData.bio}
                                        onChange={handleInputChange}
                                    />
                                </div> 
                                <label className="label">Sitio Web</label>
                                <div className="control">
                                    <input className="input is-rounded is-primary" 
                                        type="url" 
                                        name='website'
                                        value={artistData.website}
                                        onChange={handleInputChange}
                                    /> 
                                </div>
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <div className="buttons">
                                <button className="button is-primary" type="submit">Guardar</button>
                                <button className="button is-warning" onClick={onClose}>Cancelar</button>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </form>
    );
}
