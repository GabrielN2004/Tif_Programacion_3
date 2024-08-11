import 'bulma/css/bulma.min.css';
import styles from '../components/styles/SongCard.module.css';
export default function SongsCard({ song, user_ID }) {
    return (
        <div className={`card has-background-dark columns my-1 mx-2 ${styles.customCard}`}>
            <div className={`card-image ${styles.customCardImage}`}>
                <figure className={`image is-4by3 ${styles.customImage}`}>
                    <img src={song.cover} alt={song.title} />
                </figure>
            </div>
            <div className={`card-content ${styles.customCardContent}`}>
                <div className="media">
                    <div className={`media-content ${styles.customMediaContent}`}>
                        <p className={`title is-4 has-text-white ${styles.customTitle}`}>
                            {song.title}
                        </p>
                    </div>
                </div>
                <div className={`content audio ${styles.customAudio}`}>
                    <audio controls>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
        </div>
    );
}
