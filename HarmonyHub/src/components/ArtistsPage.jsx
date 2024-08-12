import React, {useState} from 'react';
import ArtistList from './ArtistList';
import Navbar from './Navbar';  
import ArtistCrear from './ModalArtist/ArtistCrear'; // Importa el componente del modal
import 'bulma/css/bulma.min.css';

export default function ArtistsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div>
            <Navbar />
            <section className="section">
                <div className="container">
                    <h1 className="title">Artistas</h1>
                    <div className="is-flex is-justify-content-center">
                        <div className="buttons has-addons">
                            <button className="button" onClick={handleOpenModal}>Nuevo Artista</button>
                            <button className="button">Modificar Artista</button>
                            <button className="button">Eliminar Artista</button>
                        </div>
                    </div>

                    <ArtistList />
                </div>
            </section>
            {/* Modal para crear un nuevo artista */}
            <ArtistCrear isOpenn={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
    }
    
