import 'bulma/css/bulma.min.css';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';

export default function CrearSongs({ isOpenN, onClose }) {
    const { token } = useAuth("state");
    const [songData, setSongData] = useState({ title: "", year: "", album: "" });
    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (event) => {
        setSongData({ ...songData, [event.target.name]: event.target.value });
    };

    const handleSongSubmit = (event) => {
        event.preventDefault();
        if (!submitting) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("title", songData.title);
            newForm.append("year", songData.year);
            newForm.append("album", songData.album);

            fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: newForm,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    alert("Se creó la canción exitosamente");
                    console.log("Datos de la canción:", data);
                })
                .catch((error) => {
                    console.error("Error al crear la canción:", error);
                    alert("Error al crear la canción. Verifica la consola para más detalles.");
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };

    return (
        <div className={`modal ${isOpenN ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Crear Canción</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSongSubmit}>
                        <div className="field">
                            <label className="label">Título</label>
                            <div className="control">
                                <input className="input is-rounded is-primary" type="text" name="title" value={songData.title} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Año</label>
                            <div className="control">
                                <input className="input is-rounded is-primary" type="number" name="year" value={songData.year} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Álbum</label>
                            <div className="control">
                                <input className="input is-rounded is-primary" type="number" name="album" value={songData.album || null} onChange={handleInputChange} />
                            </div>
                        </div>
                        <footer className="modal-card-foot">
                            <div className="buttons">
                                <button className="button is-warning" onClick={onClose} type="button">Cancelar</button>
                                <button className="button is-success" type="submit" disabled={submitting}>
                                    {submitting ? "Guardando..." : "Guardar"}
                                </button>
                            </div>
                        </footer>
                    </form>
                </section>
            </div>
        </div>
    );
}
