import React from "react";
import { Navbar } from "./components/Navbar.jsx";
import '../src/components/styles/App.css'
import { SongsPage } from "./components/SongsPage.jsx";
//import { FooterBar } from "./components/Footer.jsx";

export function App() {
    const songs = [
          { title: 'Dark Horse', artist: 'Katy Perry', cover: 'https://http2.mlstatic.com/D_870242-MLU54963527724_042023-C.jpg' },
          { title: 'Song 2', artist: 'Artist 2', cover: 'cover2.jpg' },
          { title: 'Song 3', artist: 'Artist 3', cover: 'cover3.jpg' }];
  return(
    <>
      <Navbar/>
      <SongsPage songs={songs}/>
    </>
  ); 
}