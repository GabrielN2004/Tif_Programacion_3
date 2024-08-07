import React, { useState, useEffect } from 'react';
import './styles/Navbar.css';
import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('has-background-dark', 'has-text-white');
    } else {
      document.body.classList.remove('has-background-dark', 'has-text-white');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'has-background-dark has-text-white' : 'is-light'}`} role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <h1 className={`title ${isDarkMode ? 'has-text-white' : 'has-text-black'}`}>HarmonyHub</h1>
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <a className={`navbar-item ${isDarkMode ? 'has-text-white' : ''}`} href="/">Home</a>
          <a className={`navbar-item ${isDarkMode ? 'has-text-white' : ''}`} href="./Songs">Songs</a>
          <a className={`navbar-item ${isDarkMode ? 'has-text-white' : ''}`} href="/albums">Albums</a>
          <a className={`navbar-item ${isDarkMode ? 'has-text-white' : ''}`} href="/playlists">Playlists</a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="field has-addons">
              <div className="control">
                <input
                  className={`input ${isDarkMode ? 'has-background-grey-lighter' : 'has-background-light'}`}
                  type="text"
                  placeholder="Search..."
                  style={{ color: 'black' }}
                />
              </div>
              <div className="control">
                <button className="button is-info">
                  <span className="icon">
                    <i className="fas fa-search"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="navbar-item">
            <a className="button is-light" href="/profile">
              <span className="icon">
                <i className="fas fa-user"></i>
              </span>
            </a>
          </div>
          <button
            className="button is-light"
            onClick={toggleDarkMode}
            aria-label="toggle theme"
          >
            <span className="icon">
              <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
