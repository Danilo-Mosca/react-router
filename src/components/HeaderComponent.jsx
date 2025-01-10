import { NavLink } from "react-router-dom";

const navmenu = [
    { path: "/", label: "Home" },
    { path: "/posts", label: "Lista dei post" },
    { path: "/chi-siamo", label: "Chi siamo" },
    { path: "/contact", label: "Contatti" },
];

export const HeaderComponent = () => {
    function drawMenu() {
        return navmenu.map((item) => (
            <li className="nav-item" key={item.path}>
                <NavLink
                    className="nav-link"
                    to={item.path}
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
                        <img src="../src/assets/react.svg" alt="Logo React" />
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