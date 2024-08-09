import 'bulma/css/bulma.min.css'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react';

export default function PlaylistCrear({isOpenn, onClose}){
    const {token}= useAuth("state")
    const[submitting, setSubmitting] = useState(false)
    const[loadingplaylist,setLoadingplaylist]= useState(false)
    const[playlistData, setPlaylistData]= useState({name:"", description:"", public:"false"})
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlaylistData({
            ...playlistData,
            [name]: name === "public" ? event.target.checked : value,
        });
    };

    const handleCrearPlaylistSubmit=(event)=>{
        event.preventDefault();
        if(!submitting && !loadingplaylist){    
            setSubmitting(true)
            const newForm = new FormData();   
            newForm.append("name", playlistData.name)
            newForm.append("description", playlistData.description)
            newForm.append("public",playlistData.public)


            fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/playlists/`, {
                method: "POST",
                headers: {
                    Authorization:`Token ${token}`,

            },
            body: newForm
        }) 
        .then ((response)=>{
            if(!response.ok){
                throw new Error("No se pudo crear la playlist")
            }
            return response.json()
        })
        .then ((data)=>{
            alert("Playlist creada exitosamente",data)
        })
        .catch((error)=>{
            alert("No se pudo crear la Playlist", error)
        })
        .finally(()=>{
            return setSubmitting(false) 
        })
        }
        
    }
    return(
        <form onSubmit={handleCrearPlaylistSubmit}>
        <div className={`modal ${isOpenn ? "is-active" : ""}`}>
            <div className="modal-background" >
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Crear la playlist</p>
                        <button className="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">
                    <div className="file">
                        <label className="label">Nombre</label>
                        <div className="control">
                            <input className="input is-rounded is primary" 
                            type="text" 
                            name='name'
                            value={playlistData.name}
                            onChange={handleInputChange}
                            />       
                        </div>
                        <label className="label">Descripcion</label>
                        <div className="control">
                            <input className="input is-rounded is primary" 
                            type="text" 
                            name='description'
                            value={playlistData.description}
                            onChange={handleInputChange}
                            />
                        </div> 
                        <label className="label">Publico</label>
                        <div className="control">
                            <label className='checkbox' >
                            <input 
                            type="checkbox" 
                            name='public'
                            value={playlistData.public}
                            onChange={handleInputChange}
                            /> 
                            </label>      
                        </div>
                    </div>
                    </section>
                    <footer className="modal-card-foot">
                        <div className="button">
                            <button className="button is-primary"
                            type= "submit"
                            >Guardar</button>

                            <button className="button is-warning" onClick={onClose}>Cancelar</button>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
        </form>
        
        
    );
}