import { Link } from "./Link";
import { NavLink } from "react-router";

export function Header() {
    return (
        <header className="header">
            <Link href="/"><h2 className="header-title">DevJobs</h2></Link>

            <nav className="header-nav">
                <NavLink
                    className={({ isActive }) => isActive ? "nav-link-active" : ""}
                    to="/">
                    Inicio
                </NavLink>

                <NavLink
                    className={({ isActive }) => isActive ? "nav-link-active" : ""}
                    to="/search">
                    Empleos
                </NavLink>
            </nav>

            {/* <div className="header-actions">
                <a href="#">Subir CV</a>
                <a href="#">Iniciar sesión</a>
            </div> */}

        </header>
    )
}