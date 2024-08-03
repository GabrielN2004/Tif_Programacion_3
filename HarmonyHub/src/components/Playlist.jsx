import 'bulma/css/bulma.min.css';

export default function Playlist({playlist}){
    return(
        <>
        <div className="card">
                <header className="card-header">
                    <h1 className="card-header-title">{playlist.title}</h1>
                    <div className="control">
                        <button className="button is-primary">Ver canciones</button>
                    </div>
                </header>
        </div>
        </>
    )
}


