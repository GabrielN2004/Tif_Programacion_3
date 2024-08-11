import 'bulma/css/bulma.min.css';
import imagen from '../assets/descarga.jpg'
import { useState } from 'react';


export default function SongsCard({ song, user_ID }) {
    return (
        <div className={`card has-background-dark columns my-1 mx-2`}>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className={`title is-4 has-text-white`}>
                            {song.title}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <audio controls>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
            <div className="card-footer" style={{marginLeft:"50%"}}>
                <button className="card-footer-item button is-info">
                    <span className="icon">
                        <i className="fas fa-info-circle"></i>
                    </span>
                    <span>Info</span> 
                </button>
            </div>
        </div>
    );
}
