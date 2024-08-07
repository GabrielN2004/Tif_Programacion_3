import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import SongsCard from './SongsCard';
import { useAuth } from '../contexts/AuthContext';
import DeleteSongModal from './ModalSongs/ModalDelete';

export default function SongsPage() {
    const [page, setPage] = useState(1);
    const [songs, setSongs] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);

    const { user__id } = useAuth("state");

    const observerRef = useRef();
    const lastSongElementRef = useRef();

    const doFetch = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: 5,
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

    const openModal = (song) => {
        setSelectedSong(song);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSong(null);
    };

    const modifySong = async (updatedSong) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${updatedSong.id}/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedSong),
                }
            );
            if (response.ok) {
                const modifiedSong = await response.json();
                setSongs((prevSongs) =>
                    prevSongs.map((song) =>
                        song.id === modifiedSong.id ? modifiedSong : song
                    )
                );
                closeModal(); // Cerrar el modal después de modificar
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }
    };

    const deleteSong = async (id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/${id}/`,
                {
                    method: 'DELETE',
                }
            );
            if (response.ok) {
                setSongs((prevSongs) =>
                    prevSongs.filter((song) => song.id !== id)
                );
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        }
    };

    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!songs.length && !isLoading) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <Navbar />
            <div className="my-5">
                <h2 className="title">Lista de Canciones</h2>
                <form className="box" onSubmit={handleSearch}>
                    <div className="field">
                        <label className="label">Título:</label>
                        <div className="control">
                            <input className="input" type="text" name="title" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Artista:</label>
                        <div className="control">
                            <input className="input" type="number" name="artists" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Fecha de inicio:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="datetime-local"
                                name="created_at_min"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Fecha de fin:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="datetime-local"
                                name="created_at_max"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button is-primary" type="submit">
                            Buscar
                        </button>
                    </div>
                </form>
                <ul>
                    {songs.map((song, index) => {
                        if (songs.length === index + 1) {
                            return (
                                <div
                                    key={song.id}
                                    ref={lastSongElementRef}
                                    className="column is-two-thirds"
                                >
                                    <SongsCard song={song} user_ID={user__id} />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={song.id}
                                    className="column is-two-thirds"
                                >
                                    <SongsCard song={song} user_ID={user__id} />
                                </div>
                            );
                        }
                    })}
                </ul>
                {isLoading && <p>Cargando más canciones...</p>}
            </div>
            {isModalOpen && (
                <DeleteSongModal onClose={closeModal}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            modifySong({
                                ...selectedSong,
                                title: e.target.title.value,
                                artists: e.target.artists.value,
                                // otros campos
                            });
                        }}
                    >
                        <div className="field">
                            <label className="label">Título:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="title"
                                    defaultValue={selectedSong.title}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Artista:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="artists"
                                    defaultValue={selectedSong.artists}
                                />
                            </div>
                        </div>
                        {/* Agrega más campos según sea necesario */}
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-success" type="submit">Guardar cambios</button>
                            </div>
                            <div className="control">
                                <button className="button" onClick={closeModal}>Cancelar</button>
                            </div>
                        </div>
                    </form>
                </DeleteSongModal>
            )}
        </div>
    );
}