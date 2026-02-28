import { Link } from "./Link";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../store/AuthStore";
import { useFavoritesStore } from "../store/FavoritesStore";
import styles from "./Header.module.css"

export function Header() {
    const { isLogin } = useAuthStore()
    const { countFavorites } = useFavoritesStore()
    const numberOfFavorites = countFavorites()

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

                {
                    isLogin && (
                        <NavLink
                            className={({ isActive }) => isActive ? "nav-link-active" : ""}
                            to="/profile">
                            Profile (❤️{numberOfFavorites})
                        </NavLink>
                    )
                }

            </nav>

            <LoginButton />

            {/* <div className="header-actions">
                <a href="#">Subir CV</a>
                <a href="#">Iniciar sesión</a>
            </div> */}

        </header>
    )
}

function LoginButton() {
    const { isLogin, logout } = useAuthStore()
    const { clearFavorite } = useFavoritesStore()
    const navigate = useNavigate()
    const location = useLocation()

    const handleClickLogout = () => {
        logout()
        clearFavorite()
    }
    const handleClickLogin = () => navigate("/login")

    return (

        location.pathname === "/login" ? null : (
            isLogin ?
                <button className={styles.logButon} onClick={handleClickLogout}>Logout</button>
                :
                <button className={styles.logButon} onClick={handleClickLogin}>Login</button>
        )

    )
}
