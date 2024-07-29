//*Importamos los styles
import 'bulma/css/bulma.min.css';
//*Importamos Font-Awesome 
import '@fortawesome/fontawesome-free/css/all.min.css';

export function Navbar({ isDarkMode, toggleDarkMode }) {
    return (
      <nav className={`navbar ${isDarkMode ? 'has-background-dark has-text-white' : 'is-light'}`} role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <h1 className={`title ${isDarkMode ? 'has-text-white' : ''}`}>HarmonyHub</h1>
          </a>
        </div>
  
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className={`navbar-item ${isDarkMode ? 'has-text-white' : ''}`} href="/">Home</a>
            <a className={`navbar-item ${isDarkMode ? 'has-text-white' : ''}`} href="/songs">Songs</a>
            <a className={`navbar-item ${isDarkMode ? 'has-text-white' : ''}`} href="/albums">Albums</a>
            <a className={`navbar-item ${isDarkMode ? 'has-text-white' : ''}`} href="/playlists">Playlists</a>
          </div>
  
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field has-addons">
                <div className="control">
                  <input className="input" type="text" placeholder="Search..." />
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