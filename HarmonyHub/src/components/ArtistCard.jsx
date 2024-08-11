/************modificacion del 11-08-24 */
import 'bulma/css/bulma.min.css';

export default function ArtistCard({ artist }) {
    return (
        <div className="column is-one-quarter">
            <div className="card">
                <div className="card-image">
                    {artist.image && (
                        <figure className="image is-4by3">
                            <img src={artist.image} alt={artist.name} />
                        </figure>
                    )}
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{artist.name}</p>
                            {artist.bio && (
                                <p className="subtitle is-6">{artist.bio}</p>
                            )}
                            {artist.website && (
                                <a
                                    className="subtitle is-6 has-text-info"
                                    href={artist.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visita su sitio web
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="content">
                        <p><strong>Creado en:</strong> {new Date(artist.created_at).toLocaleDateString()}</p>
                        <p><strong>Actualizado en:</strong> {new Date(artist.updated_at).toLocaleDateString()}</p>
                        <p><strong>Propietario:</strong> {artist.owner}</p>
                        <p><strong>Canciones:</strong> {artist.songs.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

