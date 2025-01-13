import { NavLink } from "react-router-dom";

const navmenu = [
    { path: "/", label: "Home" },
    { path: "/posts", label: "Lista dei post" },
    { path: "/chi-siamo", label: "Chi siamo" },
    { path: "/contact", label: "Contatti" },
];

export const HeaderComponent = () => {
    
    // Funione che disegna la barra del menu nell'header
    function drawMenu() {
        return navmenu.map((item) => (
            <li className="nav-item" key={item.path}>
                <NavLink
                    className="nav-link"
                    to={item.path}
                    end         // con l'attributo "end" specifico che il menu di navigazione "Lista dei post" deve apparire rosso e quindi essere
                                // attivo (grazie alla property isActive) solo quando io sono effettivamente nella Lista dei post e quindi solo quando
                                // l'url è:
                                //  http://localhost:5173/posts 
                                // non anche quando clicco sul pulsante "Aggiungi un nuovo post" oppure quando sono sulla pagina 
                                // dettaglio del singolo post. Se infatti tolgo l'attributo end il testo della <li> del menu "Lista dei post"
                                // sarà rosso anche per le pagine sopra citate.
                    style={({ isActive }) => ({
                        color: isActive ? "red" : "black",
                    })}
                >
                    {item.label}
                </NavLink>
            </li>
        ));
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img src="../src/assets/homepage.svg" alt="Logo React" className="logo-header" />
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* richiamo subito la funzione drawMenu, non per riferimento, quindi va tra parentesi tonde: drawMenu() */}
                        <ul className="navbar-nav">{drawMenu()}</ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};