import React, { useState } from 'react';
import { SongsCard } from './SongsCard';
import 'bulma/css/bulma.min.css';

export function SongsPage({ songs }) {
    const [mostrarModal, setMostrarModal] = useState(false);

    const abrirModal = () => {
        setMostrarModal(true);
    }

    const cerrarModal = () => {
        setMostrarModal(false);
    }

    return (
        <div>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', marginLeft: '10px' }}>
                <h1 className="title">Canciones</h1>
                <button className="button is-link" onClick={abrirModal} style={{marginRight: '10px'}}>Agregar una canción</button>
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
    );
}
