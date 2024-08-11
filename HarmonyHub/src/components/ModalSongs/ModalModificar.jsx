import React, { useRef, useState } from 'react';
import 'bulma/css/bulma.min.css';
import { useAuth } from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';

export default function modifySong ({isModificarOpen, OnCloseModificar,}) {
    const { token } = useAuth("state");
    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditingState, setIsEditingState] = useState(false);

    const titleRef = useRef(null)
    const yearRef = useRef(null)
    const albumRef = useRef(null)

    const {
        data: updatedSongData,
        isLoading: loadingUpdate,
        isError: errorUpdating,
        doFetch: updateSong,
    } = useFetch();
    
    useEffect(() => {
        if (updatedSongData && isEditingSong) {
            setIsEditingSong(false);
            songData.title = updatedSongData.title;
            songData.year = updatedSongData.year;
            songData.album = updatedSongData.album;
            // Actualiza otros campos necesarios
        }
    }, [updatedSongData]);
    
    function handleSubmit(event) {
        event.preventDefault();
        updateSong(
            `${import.meta.env.VITE_API_BASE_URL}songs/${song_id}/`,  // URL adaptada para canciones
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify({
                    title: titleRef.current.value,
                    year: yearRef.current.value,
                    album: albumRef.current.value,
                    // Añade otros campos a modificar
                }),
            }
        );
    }
    






















    return(
        <p>Hola</p>
    )
}

