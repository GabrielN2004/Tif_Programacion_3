/***************Modificacion del 11-08-24 */
import React, { useState, useEffect } from 'react';
import ArtistCard from './ArtistCard';
import 'bulma/css/bulma.min.css';

const API_URL = "https://sandbox.academiadevelopers.com/harmonyhub/artists/";

export default function ArtistList() {
    const [artists, setArtists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchArtists = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}?page=${page}`);
            const data = await response.json();

            setArtists(data.results);
            setTotalPages(Math.ceil(data.count / 4));  // Asumiendo 4 artistas por página
            setLoading(false);
        } catch (error) {
            console.error("Error fetching artists:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArtists(currentPage);
    }, [currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container">
            <div className="columns is-multiline">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    artists.map((artist) => (
                        <ArtistCard key={artist.id} artist={artist} />
                    ))
                )}
            </div>
            <div className="buttons is-centered mt-4">
                <button
                    className="button is-link"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <button
                    className="button is-link"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
            <p className="has-text-centered">
                Página {currentPage} de {totalPages}
            </p>
        </div>
    );
}
