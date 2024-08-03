import { useEffect, useState } from "react"
import Playlist from "./Playlist"
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Navbar } from "./Navbar";

export default function ListaPlaylist() {
    const [page, setPage]= useState(1);
    const [nextURL, setNextURL]= useState(null);
    const [playlists, setPlaylists]= useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError , setIsError] = useState(false)

    const doFetch = async () =>{
        setIsLoading(true);
        fetch(
            `${
                import.meta.env.VITE_API_BASE_URL
            }harmonyhub/playlists/?page=${page}&page_size=5`
        )
            .then((response)=>{
                if(!response.ok){
                    throw new Error ("No se cargaron las playlists");
                }
                return response.json();
            })
            .then ((data)=>{
                setPlaylists((prevPlaylists) =>[...prevPlaylists, ...data.results]);
                setNextURL(data.next);       
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };
    function handleLoadMore() {
        if (nextURL){
            setPage((currentPage) => currentPage + 1);
        }
    }
    useEffect(() => {
        doFetch();
    }, [page]);

    return(
        <>
        <Navbar/>
        <div>
            <div className="my-5">
                <h1 className="title is-4" style={{marginLeft:'15px'}}>PlayLists</h1>
                <div className="dropdown is-active">
                    <div className="dropdown-trigger">
                        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span>Menu</span>
                            <span className="icon is-small">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            <a href="#" className="dropdown-item" >Agregar PlayList</a>
                        </div> 
                    </div>

                </div>
                <ul>
                    {playlists.map((playlist) => (
                        <div key={playlist.id} className="column is-two-thirds">
                            <Playlist playlist={playlist} />
                        </div>
                    ))}
                </ul>
                {isLoading && <p>Cargando Mas...</p>}
                {nextURL && !isLoading &&(
                    <button className="button is-link" onClick={handleLoadMore}>Cargar Más</button>
                )}
            </div>
        </div>
        </>
    )
}