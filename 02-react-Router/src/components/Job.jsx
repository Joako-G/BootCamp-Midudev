import { Link } from 'react-router'
import { useState } from "react"
import styles from "./Job.module.css"
import { useFavoritesStore } from '../store/FavoritesStore'
import { useAuthStore } from '../store/AuthStore'



function Job({ job }) {
    const { titulo, empresa, ubicacion, descripcion } = job
    const { technology, modalidad, nivel } = job.data

    return (
        <article
            className={styles.jobListingCard}
            data-technology={technology}
            data-ubication={modalidad}
            data-experience={nivel}
        >
            {/* className={styles.cardContent} */}
            <div className={styles.cardContent}>
                <h3>
                    <Link
                        className={styles.title}
                        to={`/jobs/${job.id}`}>
                        {titulo}
                    </Link>
                </h3>
                <small> {empresa} | {ubicacion} </small>
                <p> {descripcion} </p>
            </div>
            <div className={styles.actions}>
                <Link to={`/jobs/${job.id}`} className={styles.details}>
                    Ver detalles
                </Link>

                <ActionsButton jobId={job.id} />
            </div>

        </article>
    )
}

function ActionsButton({ jobId }) {
    const [isApplied, setIsApplied] = useState(false)
    const { toggleFavorite, isFavorite } = useFavoritesStore()
    const { isLogin } = useAuthStore()

    const applied = isApplied ? 'is-applied' : ''
    const btnText = isApplied ? 'Aplicado' : 'Aplicar'
    const isDisabled = isApplied ? true : false

    const handleClick = () => {
        setIsApplied(true)
    }

    return (
        <>
            <button onClick={handleClick} className={` button-apply-job ${applied}`} disabled={!isLogin ?? isDisabled}> {btnText} </button>
            <button className={styles.favoriteBtn} disabled={!isLogin} onClick={() => toggleFavorite(jobId)}>
                {isFavorite(jobId) ? '❤️' : '🤍'}
            </button>
        </>

    )
}

export default Job