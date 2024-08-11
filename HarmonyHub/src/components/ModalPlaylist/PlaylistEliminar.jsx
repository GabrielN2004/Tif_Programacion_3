import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import PlaylistCard from "../PlaylistCard";
import'bulma/css/bulma.min.css'

export default function PlaylistEliminar({isOpen_2, onClose}){
    const {user__id} = useAuth("state")
    const {token} = useAuth("state")
    const [nextURL, setNextURL]= useState(null);
    const[filters, setFilters] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [page, setPage]= useState(1)
    const [isError, setIsError]= useState(false)
    const observerRef = useRef();
    const lastplaylistElementRef = useRef();

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
                observerRef.current.observer(lastplaylistElementRef.current);
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

    const handleDelete = (playlist_id) =>{
        fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlists/${playlist_id}`,{
            method:"DELETE",
            headers :{
                Authorization : `Token ${token}`
            }
            
        })
        .then((response)=>{
            if (response.ok){
                alert("Se elimino exitosamente la Playlist")
                setPlaylists((prevPlaylists)=> prevPlaylists.filter((playlist)=> playlist.id !== playlist_id))
            } else{
                setIsError(true);
            }
        })
        .catch(()=>{
            setIsError(true);
        })
    }
    console.log(isOpen_2)
    return (
        <div className={`modal ${isOpen_2 ? "is-active" : ""}`}>
        <div className="modal-background" onClick={onClose}></div>
        <div className="modal-card">
            <header className="modal-card-head">
            <button className="delete" aria-label="close" onClick={onClose}></button>
                <form className="box" onClick={handleSearch}>
                    <div className="field">
                        <label className="label">Titulo</label>
                        <div className="control">
                            <input className="input" type="text" name="name" />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button is-link" type="submit"><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </header>
            <div>
                <ul>
                    {playlists.map((playlist, index)=>{
                        const isLastElement = playlists.length === index +1;
                        return(
                            <div key={playlist.id} ref={isLastElement ? lastplaylistElementRef : null} className="column is-two-thirds">
                                <PlaylistCard playlist={playlist} user_ID={user__id}/>
                                <button className="button is-danger mt-2" onClick={()=>handleDelete(playlist.id)}>Eliminar</button>
                            </div>
                        );
                    })}
                    
                </ul>
            </div>
        </div>
    </div>
    )
    
}

