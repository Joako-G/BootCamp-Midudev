import { Link } from "./Link";
import { NavLink } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function Header() {
    const { isLogin, login, logout } = useAuth()

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

            {
                isLogin
                    ? <button onClick={logout}>Cerrar sesión</button>
                    : <button onClick={login}>Iniciar sesión</button>
            }

            {/* <div className="header-actions">
                <a href="#">Subir CV</a>
                <a href="#">Iniciar sesión</a>
            </div> */}

        </header>
    )
}