import Playlist from "./Playlist"
import '@fortawesome/fontawesome-free/css/all.min.css'

export default function ListaPlaylist({playlists}) {
    return(
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
            </div>
        </div>
    )
}