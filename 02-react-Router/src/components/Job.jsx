import { Link } from 'react-router'
import { useState } from "react"
import styles from "./Job.module.css"

function Job({ job }) {
    const [isApplied, setIsApplied] = useState(false)
    const { titulo, empresa, ubicacion, descripcion } = job
    const { technology, modalidad, nivel } = job.data
    const applied = isApplied ? 'is-applied' : ''
    const btnText = isApplied ? 'Aplicado' : 'Aplicar'
    const isDisabled = isApplied ? true : false

    const handleClick = () => {
        setIsApplied(true)
    }

    return (
        <article
            className="job-listing-card"
            data-technology={technology}
            data-ubication={modalidad}
            data-experience={nivel}
        >
            <div>
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
            <div className="actions">
                <Link to={`/jobs/${job.id}`} className={styles.details}>
                    Ver detalles
                </Link>
                <button onClick={handleClick} className={` button-apply-job ${applied}`} disabled={isDisabled}> {btnText} </button>
            </div>

        </article>
    )
}

export default Job