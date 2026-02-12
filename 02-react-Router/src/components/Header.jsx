import { Link } from "./Link";

export function Header() {
    return (
        <header className="header">
            <Link href="/"><h2 className="header-title">DevJobs</h2></Link>

            <nav className="header-nav">
                <Link href="/">Inicio</Link>
                <Link href="/search">Empleos</Link>
            </nav>

            {/* <div className="header-actions">
                <a href="#">Subir CV</a>
                <a href="#">Iniciar sesión</a>
            </div> */}

        </header>
    )
}