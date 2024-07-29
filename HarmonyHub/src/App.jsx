import React from "react";
import { useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { FooterBar } from "./components/Footer.jsx";

export function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('has-background-dark', !isDarkMode);
        document.body.classList.toggle('has-text-white', !isDarkMode);
        };
  return(
    <div>
      <>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      </>
    </div>
  ); 
}