import { useEffect, useState } from "react"
import { useParams, useNavigate, NavLink } from "react-router"
import snarkdown from 'snarkdown'
import styles from "./JobDetail.module.css"
import { useAuthStore } from "../store/AuthStore"
import { useFavoritesStore } from "../store/FavoritesStore"

function JobSection({ title, content }) {
    const html = snarkdown(content ?? "")

    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}> {title} </h2>
            <div className={`${styles.sectionContent} prose check`}>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </section>
    )
}

function Breadcrumb({ job }) {
    return (
        < nav className={styles.breadcrumb} >
            {/* Breadcrumb */}
            <nav className={styles.breadcrumb}>
                <NavLink
                    className={({ isActive }) => isActive ? "nav-link-active" : ""}
                    to="/search">
                    Empleos
                </NavLink>
                <span className={styles.breadcrumbSeparator}>/</span>
                <span className={styles.breadcrumbTitle}>{job.titulo}</span>
            </nav>
        </nav >
    )
}

function HeaderJobDetail({ job }) {
    return (
        <>
            < header className={styles.header} >
                {/* Header principal */}
                <h1 className={styles.title}>{job.titulo}</h1>
                <p className={styles.meta}> {job.empresa} - {job.ubicacion} </p>

            </header >
            <div className={styles.buttons}>
                <DetailApplyButton />
                <DetailFavoriteButton jobId={job.id} />
            </div>
        </>

    )
}

function DetailApplyButton() {
    const { isLogin } = useAuthStore()

    return (
        <button disabled={!isLogin} className={styles.applyButton}>
            {isLogin ? "Aplicar a esta oferta" : "Inicia sesión para aplicar"}
        </button>
    )
}
function DetailFavoriteButton({ jobId }) {
    const { isLogin } = useAuthStore()
    const { toggleFavorite, isFavorite } = useFavoritesStore()

    return (
        <button
            disabled={!isLogin}
            onClick={() => toggleFavorite(jobId)}
            aria-label={isFavorite(jobId) ? "Remove from favorites" : "Add to favorites"}
        >
            {isFavorite(jobId) ? '❤️' : '🤍'}
        </button>
    )
}


export default function JobDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) return

        const controller = new AbortController()

        const fetchJob = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`,
                    { signal: controller.signal }
                )

                if (!response.ok) {
                    throw new Error("Job not found")
                }

                const data = await response.json()
                setJob(data)
            } catch (error) {
                if (error.name === "AbortError") return
                setError(error.message)
                setJob(null)
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        fetchJob()

        return () => {
            controller.abort()
        }

    }, [id]);

    if (loading) {
        return (
            <div className={styles.loading}>
                <p>Cargando oferta...</p>
                {/* aquí puedes pegar el HTML de skeleton que ya tienes preparado */}
            </div>
        )
    }

    if (error || !job) {
        return (
            <div className={styles.notFound}>
                <h1>Oferta no encontrada</h1>
                <p>Puede que esta oferta haya caducado o que la URL no sea correcta.</p>
                <button className={styles.backButton} onClick={() => navigate('/jobs')}>
                    Volver a la lista de empleos
                </button>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <Breadcrumb job={job} />
            <HeaderJobDetail job={job} />

            {/* Aquí irán las secciones de contenido */}
            <JobSection title="Descripción del puesto" content={job.descripcion} />
            <JobSection title="Responsabilidades" content={job.content.responsibilities} />
            <JobSection title="Requisitos" content={job.content.requirements} />
            <JobSection title="Acerca de la empresa" content={job.content.about} />


        </div>
    )
}