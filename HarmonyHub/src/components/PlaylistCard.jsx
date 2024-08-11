import 'bulma/css/bulma.min.css'
export default function PlaylistCard({playlist, user_ID}){
    return(
        <div className="card has-background-dark columns my-1 max-2">
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4  is-spaced has-text-white" >{playlist.name}</p>
                        <p className="subtitle is-5 has-text-white ">{playlist.description}</p>
                        <p className="subtitle is-5 has-text-white ">{playlist.public}</p>
                    </div>
                </div>
            </div>
        </div>
    )
        
}