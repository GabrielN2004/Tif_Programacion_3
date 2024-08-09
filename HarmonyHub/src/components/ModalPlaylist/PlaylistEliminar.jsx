import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function EliminarPlaylist({isOpen, onClose, playlist_id, onDelete}){
    const {token}= useAuth("state")

    const handleEliminarPlaylist = (event)=>{
        event.preventDefault();

        onDelete.doFetch(
            `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/playlists/${playlist_id}`,
            {
                method: "DELETE",     //OPCIONES
                headers:{
                    Authorization: `Token ${token}`,
                },
                
            }
        );
    };
    useEffect(()=>{
        if(onDelete.data){
            onClose();
        }
    }, [onDelete.data]);
        if (!isOpen)
            return null;

        return (
            <div className={`modal ${isOpen ? "is-active" : ""}`}>
                <div className="modal-background" onClick={onClose}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Eliminar Playlist</p>
                        <button className="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <form onSubmit={handleEliminarPlaylist}>
                            <div className="field">
                                <p className="¿Estas seguro que desea eliminar la Playlist?"></p>
                            </div>
                            <button className="button is-danger" type="submit" disabled={onDelete.isLoading}>
                                {onDelete.isLoading ? "Eliminando...":"Confirmar"}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        );
}
