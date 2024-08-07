import 'bulma/css/bulma.min.css';
import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import imagen from '../assets/descarga.jpg'
import DeleteSongModal from './ModalSongs/ModalDelete';

export default function SongsCard({ song, user_ID }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isLoading, isError, doFetch } = useFetch();

    return (
        <div className={`card has-background-dark columns my-1 mx-2`}>
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={song.cover_image ||imagen } alt="Cover Image" />
                </figure>
            </div>
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
                <button className="card-footer-item button is-danger">
                    <span>
                        Eliminar
                    </span>

                </button>
            </div>
            {isModalOpen && (
                <DeleteSongModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    song_id={song.id}
                    onDelete={{ data, isLoading, isError, doFetch }}
                />
            )}
        </div>
    );
}
