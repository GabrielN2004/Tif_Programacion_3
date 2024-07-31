import React from "react";
import { useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { SongsCard } from "./components/songsCard.jsx";
import './App.css'
//import { FooterBar } from "./components/Footer.jsx";

export function App() {
  const handleAddToPlaylists = () => {
    alert("Se agrego a la Playlists")
  }
  const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('has-background-dark', !isDarkMode);
        document.body.classList.toggle('has-text-white', !isDarkMode);
        };
  return(
      <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container">
      <div className="columns is-multiline">
        <div className="column is-one-third">
          <SongsCard
            songTitle="Dark Horse"
            artistName="Katy Perry"
            albumCover="https://i.scdn.co/image/ab67616d0000b27347f930accd8ac01686401fa2" // URL de una imagen como placeholder
            onAddToPlaylists={handleAddToPlaylists}
          />
        </div>
        <div className="column is-one-third">
          <SongsCard
            songTitle="Trouble"
            artistName="Taylor Swift"
            albumCover="https://upload.wikimedia.org/wikipedia/en/e/e8/Taylor_Swift_-_Red.png"
            onAddToPlaylists={handleAddToPlaylists}
          />
        </div>
        <div className="column is-one-third">
          <SongsCard
            songTitle="Song Title 3"
            artistName="Artist Name 3"
            albumCover="https://via.placeholder.com/150"
            onAddToPlaylists={handleAddToPlaylists}
          />
        </div>
        {/* Agrega más SongCard aquí según sea necesario */}
      </div>
    </div>
      </>
  ); 
}