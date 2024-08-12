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

    function handleLoadMore() {
        if (nextUrl) {
            setPage((currentPage) => currentPage + 1);
        }
    }

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

    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!songs.length && !isLoading) return <p>No hay canciones disponibles</p>;

    return (
        <div>
            <Navbar />
            <div className="my-5">
                <header>
                    <h2 className="title">Lista de Canciones</h2>
                    <div className="buttons is-flex" style={{alignContent:"center", marginLeft:"38.5%"}}>
                        <button className="button is-primary" onClick={() => setIsModalOpen_2(true)} style={{margin:"10px"}}>
                            <span>Crear</span>
                        </button>
                        <button className="button is-danger" onClick={() => setIsModalOpen(true)} style={{margin:"10px"}}>
                            <span>Eliminar</span>
                        </button>
                        <button className="button is-info" onClick={() => setIsModificarOpen(true)} style={{margin:"10px"}}>
                            <span>Modificar</span>
                        </button>
                    </div>
                </header>
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
                <ul>
                    {songs.map((song, index) => (
                        <div
                            key={song.id}
                            ref={index === songs.length - 1 ? lastSongElementRef : null}
                            className="column is-two-thirds"
                        >
                            <SongsCard song={song} user_ID={user__id} />
                        </div>
                    ))}
                </ul>
                {isLoading && <p>Cargando más canciones...</p>}
                {nextUrl && !isLoading && (
                    <button className="button is-link" onClick={handleLoadMore} style={{marginTop: '20px'}}>
                        Cargar Más
                    </button>
                )}
            </div>
            {isModalOpen && (
                <DeleteSongModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            {isModalOpen_2 && (
                <CrearSongs
                    isOpenN={isModalOpen_2}
                    onClose={() => setIsModalOpen_2(false)}
                />
            )}
            {isModificarOpen && (
                <ModifySong
                    isModificarOpen={isModificarOpen}
                    OnCloseModificar={() => setIsModificarOpen(false)}
                />
            )}
        </div>
    );
}
