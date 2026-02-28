import styles from './Profile.module.css'

export default function Profile() {
    return (
        <main className={styles.container}>
            <header>
                <h2 className={styles.userName}>Usuario DEMO</h2>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                        <small className={styles.correo}>usuario@ejemplo.com</small>
                    </div>
                </div>
            </header>

            <div className={styles.content}>
                <section className={styles.personalInfo}>
                    <h2 className={styles.title}>Informacion Personal</h2>
                    <div className={styles.infoGrid}>
                        <div>
                            <span className={styles.label}>Nombre:</span>
                            <p>Usuario DEMO</p>
                        </div>
                        <div>
                            <span className={styles.label}>Correo:</span>
                            <p>usuario@ejemplo.com</p>
                        </div>
                        <div>
                            <span className={styles.label}>Teléfono:</span>
                            <p>+123456789</p>
                        </div>
                        <div>
                            <span className={styles.label}>Dirección:</span>
                            <p>S. S. de Jujuy - Argentina</p>
                        </div>
                    </div>
                </section>

                <section className={styles.experience}>
                    <h2 className={styles.title}>Experiencia</h2>
                    <div className={styles.jobs}>
                        <h3 className={styles.titleJob}>Desrrollador Frontend</h3>
                        <p className={styles.company}>Empresa XYZ - 2021 - Presente</p>
                        <span className={styles.description}>Desarrollador de aplicaciones web con React, TypeScript y Next.js</span>
                    </div>

                    <div className={styles.jobs}>
                        <h3 className={styles.titleJob}>Desarrollador Junior</h3>
                        <p className={styles.company}>Startup ABC - 2019 - 2021</p>
                        <span className={styles.description}>Mantenimiento y desarrollo de features en aplicaciones legacy</span>
                    </div>
                </section>

                <section className={styles.skills}>
                    <h2 className={styles.title}>Habilidades</h2>
                    <div className={styles.skillList}>
                        <h4>JavaScript</h4>
                        <h4>TypeScript</h4>
                        <h4>React</h4>
                        <h4>Next.js</h4>
                        <h4>Node.js</h4>
                        <h4>HTML</h4>
                        <h4>CSS</h4>
                    </div>
                </section>
            </div>
        </main>
    );
}