import React, { useState } from 'react';
import { SongsCard } from './SongsCard.jsx';
import 'bulma/css/bulma.min.css';
import { Navbar } from './Navbar.jsx';

export  default function SongsPage() {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [page, setPage] = useState(1);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [songs, setSongs] = useState([]);

    const toggleDropdown = () => {
        setIsActive(!isActive);
    };

    const abrirModal = () => {
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };
    const doFetch = async () => {
        setIsLoading(true);
        fetch(
            `${
                import.meta.env.VITE_API_BASE_URL
            }harmonyhub/songs/?page=${page}&page_size=5`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se puedieron cargar las canciones");
                }
                return response.json();
            })
            .then((data) => {
                if (data.results) {
                    setSongs((prevSongs) => [...prevSongs, ...data.results]);
                    setNextURL(data.next);
                }
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return(
        <>
        <Navbar/>
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginLeft: '10px' }}>
                <h1 className="title">Canciones</h1>
                <div className={`dropdown ${isActive ? 'is-active' : ''}`}>
                    <div className="dropdown-trigger">
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggleDropdown} style={{marginRight:'10px'}}>
                            <span>Configuracion</span>
                            <span className="icon is-small">
                                <i className="fas fa-cog" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            <a className="dropdown-item">New Songs</a>
                            <a className="dropdown-item">Modification</a>
                        </div>
                    </div>
                </div>
            </header>

            {mostrarModal && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={cerrarModal}></div>
                    <div className="modal-content">
                        <div className="box">
                            <h3 className="title is-4">Agregar a Playlist</h3>
                            <div className="field">
                                <div className="control">
                                    <input className="input" type="text" placeholder="Buscar playlists" />
                                </div>
                            </div>
                            <div className="list">
                                <p className="list-item">Playlist 1</p>
                                <p className="list-item">Playlist 2</p>
                                <p className="list-item">Playlist 3</p>
                            </div>
                            <button className="button is-primary" onClick={cerrarModal} style={{ marginTop: "10px" }}>
                                Cerrar Modal
                            </button>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={cerrarModal}></button>
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                {songs.map((song, index) => (
                    <div key={index} style={{ flex: '1 1 200px', maxWidth: '300px', margin: '10px' }}>
                        <SongsCard
                            songTitle={song.title}
                            artistName={song.artist}
                            albumCover={song.cover}
                            onAddToPlaylists={abrirModal}
                        />
                    </div>
                ))}
            </div>
        </div>
        
        </>
    );
}
