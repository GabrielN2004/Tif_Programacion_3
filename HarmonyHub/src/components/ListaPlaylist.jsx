import React, { useRef, useEffect, useState } from "react"
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import  Navbar  from "./Navbar";
import PlaylistCard from "./PlaylistCard";
import PlaylistCrear from "./ModalPlaylist/PlaylistCrear";
import { useAuth } from "../contexts/AuthContext";
import PlaylistEliminar from "./ModalPlaylist/PlaylistEliminar";
import PlaylistModificar from "./ModalPlaylist/PlaylistModificar";


export default function ListaPlaylist() {
    const [page, setPage]= useState(1);
    const [nextURL, setNextURL]= useState(null);
    const [playlists, setPlaylists]= useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError , setIsError] = useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const [isOpen_2, setIsOpen_2] = useState(false)
    const [isOpenModificar, setIsOpenModificar] = useState(false)
    const [filters, setFilters]= useState({})

    const {user__id} = useAuth("state");
    const observerRef = useRef();
    const lastplaylistElementRef = useRef();
    const doFetch = async () =>{
        setIsLoading(true);
        let query = new URLSearchParams({page:page, page_size:5, ordering:`-created_at`, ...filters,}).toString();
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
    
    function handleLoadMore() {
        if (nextURL){
            setPage((currentPage) => currentPage + 1);
        }
    }

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
    if(isError)return <p>Error al cargar las Playlists</p>;
    if(!playlists.length && !isLoading)return <p>No hay playlist disponible</p>;    
    

    return(
        <>
        <Navbar/>
        <div>
            <div className="my-5">
                <h1 className="title is-4" style={{marginLeft:"20px"}}>PlayLists</h1>
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
                    <div style={{marginLeft:"50%"}}>
                    <span style={{margin:"15px"}}>
                        <button className="button is-primary" onClick={()=>setIsOpen(true)}>Agregar una nueva Playlist</button>
                    </span>
                    <span style={{margin:"15px"}}>
                        <button className="button is-primary" onClick={()=>setIsOpenModificar(true)}>Modificar</button>
                    </span>
                    <span style={{margin:"15px"}}>
                        <button className="button is-primary" onClick={()=>setIsOpen_2(true)}>Eliminar</button>
                    </span>
            </div>
                <ul>
                    {playlists.map((playlist,index) => {
                        if(playlist.lenght === index +1){
                            return(<div key={playlist.id} ref= {lastplaylistElementRef} className="column is-two-thirds">
                                <PlaylistCard playlist={playlist} user_ID={user__id}/>
                            </div>);
                        }else{
                            return (
                                <div key={playlist.id} className="column is-two-thirds">
                                    <PlaylistCard playlist={playlist} user_ID={user__id}/>
                                </div>
                            );
                        }
                        })}
                </ul>
                {isLoading && <p>Cargando Mas...</p>}
                {nextURL && !isLoading &&(
                    <button className="button is-link" onClick={handleLoadMore}>Cargar Más</button>
                )};
                {isOpen &&(
                    <PlaylistCrear
                    isOpenn = {isOpen}
                    onClose ={()=>setIsOpen(false)}
                    />
                )}
                {isOpen_2 && (
                    <PlaylistEliminar
                    isOpen_2={isOpen_2}
                    onClose={()=>setIsOpen_2(false)}
                    />
                )}
                {isOpenModificar &&(
                    <PlaylistModificar
                    isOpenModificar={isOpenModificar}
                    onClose={()=>setIsOpenModificar(false)}
                    />
                )}
                
                
            </div>
        </div>
        </>
    )
}