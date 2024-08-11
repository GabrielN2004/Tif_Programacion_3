import React, { useEffect, useRef, useState } from 'react';
import 'bulma/css/bulma.min.css';
import { useAuth } from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';
import SongsCard from '../SongsCard';

export default function ModifySong ({isModificarOpen, OnCloseModificar,}) {
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


    return(
        <div className={`modal ${isModificarOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={OnCloseModificar}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Eliminar Canción</p>
                    <button className="delete" aria-label="close" onClick={OnCloseModificar}></button>
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
                                        onClick={() => handleUpdate(song.id)}
                                    >
                                        Modificar
                                    </button>
                                </div>
                            );
                        })}
                    </ul>
                    {isLoading && <p>Cargando más canciones...</p>}
                </section>
                <footer className="modal-card-foot">
                    <button className="button" onClick={OnCloseModificar}>Cerrar</button>
                </footer>
            </div>
        </div>
    )
}

