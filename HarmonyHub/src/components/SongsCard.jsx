import 'bulma/css/bulma.min.css';
export function SongsCard({ songTitle, artistName, albumCover, onAddToPlaylists }) {
    return (
        <div className="card" style={{ maxWidth: '600px', margin: '20px auto' }}>
            <div className="card-image">
                <figure className="image is-16by9">
                    <img src={albumCover} alt="Album cover" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={albumCover} alt="Album cover" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{songTitle}</p>
                        <p className="subtitle is-6">{artistName}</p>
                    </div>
                </div>
            </div>
            <footer className="card-footer">
                <button className="card-footer-item button is-link" style={{ marginLeft: '10px', marginRight: '5px' }} onClick={onAddToPlaylists}>
                    Add to Playlists
                </button>
            </footer>
        </div>
    );
}
