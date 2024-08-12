import FooterBar from "./Footer";
import Navbar from "./Navbar";
import styles from '../components/styles/Home.module.css'; // Importar el CSS Module
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className={styles.cardsContainer}>
                <div className={`${styles.card} card`}>
                    <section className="card-content">
                        <div className="media-content">
                            <p className="title is-4">Las Canciones Más Nuevas</p>
                        </div>
                        <div className="content">
                            <p>¡Bienvenido a tu universo musical!</p>
                            <p>¡Explora, escucha y disfruta de la música que más te gusta, todo en un solo lugar!</p>
                        </div>
                    </section>
                    <header className="card-header">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="../assets/musica_imagen.jpg" alt="image" />
                            </figure>
                        </div>
                    </header>
                    <footer className="card-footer">
                        <button className="button is-link" style={{width:"100%"}}>
                            <a href="./songs" className="has-text-white"><i className="fas fa-play"></i></a>
                        </button>
                    </footer>
                </div>

                <div className={`${styles.card} card`}>
                    <section className="card-content">
                        <div className="media-content">
                            <p className="title is-4">Crea tus propias Playlist</p>
                        </div>
                        <div className="content">
                            <p>¡Bienvenido a tu universo musical!</p>
                            <p>¡Explora, escucha y crea las Playlist del momento</p>
                        </div>
                    </section>
                    <header className="card-header">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="../assets/auriculares.jpg" alt="image" />
                            </figure>
                        </div>
                    </header>
                    <footer className="card-footer">
                        <button className="button is-link" style={{width:"100%"}}>
                            <a href="./playlists" className="has-text-white"><i className="fas fa-play"></i></a>
                        </button>
                    </footer>
                </div>

                <div className={`${styles.card} card`}>
                    <section className="card-content">
                        <div className="media-content">
                            <p className="title is-4">Descubre los Artistas del Momento</p>
                        </div>
                        <div className="content">
                            <p>¡Bienvenido a tu universo musical!</p>
                            <p>¡Explora, escucha y disfruta de la música de los Artistas que te gustan.!</p>
                        </div>
                    </section>
                    <header className="card-header">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="../assets/Artista.jpg" alt="image" />
                            </figure>
                        </div>
                    </header>
                    <footer className="card-footer">
                        <button className="button is-link" style={{width:"100%"}}>
                            <a href="./artists" className="has-text-white"><i className="fas fa-play"></i></a>
                        </button>
                    </footer>
                </div>
            </div>
            <FooterBar />
        </div>
    );
}

