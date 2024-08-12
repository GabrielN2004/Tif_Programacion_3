import 'bulma/css/bulma.min.css'
import { useEffect, useState } from 'react';

export default function FooterBar (){
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
    return(
        <footer className={`footer ${isDarkMode ? 'has-background-dark has-text-white' : 'is-light'}`}>
            <div className="content has-text-centered">
                <p>
                <strong>HarmonyHub</strong> by Your Name. The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php" target="_blank" rel="noopener noreferrer"> MIT</a>.
                </p>
            </div>
            <div className="content has-text-centered">
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
        </footer>
    )
}