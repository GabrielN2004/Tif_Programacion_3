import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import PlaylistCard from "../PlaylistCard";
import'bulma/css/bulma.min.css'

export default function PlaylistModificar({isOpenModificar, onClose}){
    const {user__id} = useAuth("state")
    const {token} = useAuth("state")
    const [nextURL, setNextURL]= useState(null);
    const[filters, setFilters] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [page, setPage]= useState(1)
    const [isError, setIsError]= useState(false)
    const [selectPlaylist, setSelectPlaylist]= useState(null)
    const observerRef = useRef();
    const lastplaylistElementRef = useRef(); 
    const titleRef = useRef(null)
    const descriptionRef = useRef(null)

    const doFetch = async () =>{
        setIsLoading(true);
        let query = new URLSearchParams({page:page, page_size:1, ordering:`-created_at`, ...filters,}).toString();
        fetch(
            `${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlists/?${query}`)
            .then((response)=> response.json())
            .then ((data)=>{
                if(data.results){
                setPlaylists((prevPlaylists) =>[...prevPlaylists, ...data.results]);
                setNextURL(data.next);  
            }     
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };
    useEffect(() => {
        doFetch();
    }, [page,filters]);

    useEffect(()=>{
        if(isLoading)return;
        if(observerRef.current){
            observerRef.current.disconnect();
        }
        observerRef.current= new IntersectionObserver((cards)=>{
                if(cards[0].isIntersecting && nextURL){
                    setPage((prevPage)=>prevPage +1);
                }
            });
            if(lastplaylistElementRef.current){
                observerRef.current.observe(lastplaylistElementRef.current);
            }
    }, [isLoading, nextURL]);

    function handleSearch(event){
        event.preventDefault();
        const searchForm= new FormData(event.target);
        const newfilters= {};
        searchForm.forEach((value, key)=>{
            if(value){
                newfilters[key]= value;
            }
        });
        setFilters(newfilters);
        setPlaylists([]);
        setPage(1);    
    }

    const handleModificar = (playlistId)=>{
        const selected = playlists.find(playlist=>playlist.id===playlistId)
        setSelectPlaylist(selected)
        if(selected){
            if(titleRef.current)titleRef.current.value = selected.name;
            if(descriptionRef.current)descriptionRef.current.value= selected.description;
        }
    }
    

    const handleSaveChanges = async()=>{
        if(!selectPlaylist) return;
        const updatedPlaylist ={
            name: titleRef.current.value,
            description: descriptionRef.current.value,
        };
        try{
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlists/${selectPlaylist.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(updatedPlaylist),
        });
        if(response.ok){
            setPlaylists((prevPlaylists)=>
                prevPlaylists.map((playlist)=>
                    playlist.id === selectPlaylist.id ? {...selectPlaylist, ...updatedPlaylist} : playlist),
                    alert("Se modifico la playlist")
        );
        onCloseModificar();
        }else{
            const errorData = await response.json();
            alert("Error al actualizar la playlist", errorData);
        }
        }catch(error){
            console.error("Error al guardar los cambios:", error)
        }
    };  
    return (
        <div className={`modal ${isOpenModificar ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Modificar Playlist</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form className="box" onSubmit={handleSearch}>
                        <div className="field">
                            <label className="label">Titulo</label>
                            <div className="control">
                                <input className="input" type="text" name="name"  />
                            </div>
                        </div>
                        <div className="field">
                            <button className="button is-link" type="submit"><i className="fas fa-search"></i></button>
                        </div>
                    </form>
                    <ul>
                        {playlists.map((playlist, index)=>{
                            const isLastElement = playlists.length === index +1;
                            return(
                                <div key={playlist.id} ref={isLastElement ? lastplaylistElementRef : null} className="column is-two-thirds">
                                    <PlaylistCard playlist={playlist} user_ID={user__id}/>
                                    <button className="button is-danger mt-2" onClick={()=>handleModificar(playlist.id)}>Modificar</button>
                                </div>
                            );
                        })}
                    </ul>
                    {isLoading &&<p>Cargando mas Playlist</p>}
                    {selectPlaylist &&(
                    <div className="box mt-4">
                        <div className="field">
                            <label className="label">Título</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    ref={titleRef}
                                    defaultValue={selectPlaylist.name}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Descripción</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    ref={descriptionRef}
                                    defaultValue={selectPlaylist.description}
                                />
                            </div>
                        </div>
                        <button className="button is-success" onClick={handleSaveChanges}>Guardar Cambios</button>
                    </div>
                    )}
                </section>
                <footer className="modal-card-foot">
                    <button className="button" onClick={onClose}>Cerrar</button>
                </footer>
            </div>
        </div>
    );    
}






