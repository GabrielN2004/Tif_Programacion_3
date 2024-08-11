import React from 'react';
import ArtistList from './ArtistList';
import Navbar from './Navbar';  // Asumiendo que tienes un componente Navbar

export default function ArtistsPage() {
    return (
        <div>
            <Navbar />
            <section className="section">
                <div className="container">
                    <h1 className="title">Artistas</h1>
                    <ArtistList />
                </div>
            </section>
        </div>
    );
}
