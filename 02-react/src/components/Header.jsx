function Header() {
    return (
        <header className="header">
            <h2 className="header-title">DevJobs</h2>

            <nav className="header-nav">
                <a href="./index.html">Inicio</a>
                <a href="#">Empleos</a>
            </nav>

            <div className="header-actions">
                <a href="#">Subir CV</a>
                <a href="#">Iniciar sesión</a>
            </div>

        </header>
    )
}

export default Header
