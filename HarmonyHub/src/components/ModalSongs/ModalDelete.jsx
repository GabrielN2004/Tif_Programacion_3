import React, { useState, useEffect, useRef } from 'react';
import 'bulma/css/bulma.min.css';
import '../../components/styles/App.css';
import { useAuth } from '../../contexts/AuthContext';
import SongsCard from '../SongsCard';

export default function DeleteSongModal({ isOpen, onClose }) {
    const [page, setPage] = useState(1);
    const [songs, setSongs] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});

    const { user__id } = useAuth("state");
    const {token} = useAuth("state");

    const observerRef = useRef();
    const lastSongElementRef = useRef();

    const doFetch = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: 1,
            ordering: `-created_at`,
            ...filters,
        }).toString();

        fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?${query}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.results) {
                    setSongs((prevSongs) => [...prevSongs, ...data.results]);
                    setNextUrl(data.next);
                }
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        doFetch();
    }, [page, filters]);

    useEffect(() => {
        if (isLoading) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((cards) => {
            if (cards[0].isIntersecting && nextUrl) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (lastSongElementRef.current) {
            observerRef.current.observe(lastSongElementRef.current);
        }
    }, [isLoading, nextUrl]);

    const handleSearch = (event) => {
        event.preventDefault();

        const searchForm = new FormData(event.target);
        const newFilters = {};

        searchForm.forEach((value, key) => {
            if (value) {
                newFilters[key] = value;
            }
        });

        setFilters(newFilters);
        setSongs([]);
        setPage(1);
    };

    const handleDelete = (song_Id) => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${song_Id}/`, {
            method: "DELETE",
            headers: {
                Authorization : `Token ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                alert("Se elimino la Cancion")
                setSongs((prevSongs) => prevSongs.filter((song) => song.id !== song_Id));
            } else {
                setIsError(true);
            }
        })
        .catch(() => {
            setIsError(true);
        });
    };
    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Eliminar Canción</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form className="box" onSubmit={handleSearch}>
                        <div className="field">
                            <label className="label">Título:</label>
                            <div className="control">
                                <input className="input" type="text" name="title" />
                            </div>
                        </div>
                        <div className="field">
                            <button className="button is-primary" type="submit">
                                Buscar
                            </button>
                        </div>
                    </form>

                    <ul className="mt-4">
                        {songs.map((song, index) => {
                            const isLastElement = songs.length === index + 1;
                            return (
                                <div
                                    key={song.id}
                                    ref={isLastElement ? lastSongElementRef : null}
                                    className="column is-two-thirds"
                                >
                                    <SongsCard song={song} user_ID={user__id} />
                                    <button
                                        className="button is-danger mt-2"
                                        onClick={() => handleDelete(song.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            );
                        })}
                    </ul>

                    {isLoading && <p>Cargando más canciones...</p>}
                </section>
                <footer className="modal-card-foot">
                    <button className="button" onClick={onClose}>Cerrar</button>
                </footer>
            </div>
        </div>
    );
}
