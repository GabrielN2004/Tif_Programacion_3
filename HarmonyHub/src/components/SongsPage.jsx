import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import SongsCard from './SongsCard';
import { useAuth } from '../contexts/AuthContext';
import CrearSongs from './ModalSongs/ModalCrear';
import DeleteSongModal from './ModalSongs/ModalDelete';
import ModifySong from './ModalSongs/ModalModificar';


export default function SongsPage() {
    const [page, setPage] = useState(1);
    const [songs, setSongs] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isModalOpen_2, setIsModalOpen_2] = useState(false);
    const [isModificarOpen, setIsModificarOpen] = useState(false);

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

    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!songs.length && !isLoading) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <Navbar />
            <div className="my-5">
                <header>
                <h2 className="title">Lista de Canciones</h2>
                <button className="card-footer-item button is-danger" onClick={() => setIsModalOpen_2(true)}>
                    <span>
                        Crear
                    </span>
                </button>
                <button className="card-footer-item button is-danger" onClick={() => setIsModalOpen(true)}>
                    <span>
                        Eliminar
                    </span>
                </button>
                <button className="card-footer-item button is-danger" onClick={() => setIsModificarOpen(true)}>
                    <span>
                        Modificar
                    </span>
                </button>
                </header>
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
            {isModalOpen &&(
                <DeleteSongModal
                isOpen={isModalOpen}
                onClose={()=> setIsModalOpen(false)}
                />
            )}
            {isModalOpen_2 &&(
                <CrearSongs
                isOpenN={isModalOpen_2}
                onClose={()=> setIsModalOpen_2(false)}
                />
            )}
            {isModificarOpen &&(
                <ModifySong
                isModificarOpen={isModificarOpen}
                OnCloseModificar={()=> setIsModificarOpen(false)}
                />
            )}
        </div>
    );
}