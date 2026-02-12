import { useState } from "react"

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
                <h3> {titulo} </h3>
                <small> {empresa} | {ubicacion} </small>
                <p> {descripcion} </p>
            </div>
            <button onClick={handleClick} className={` button-apply-job ${applied}`} disabled={isDisabled}> {btnText} </button>
        </article>
    )
}

export default Job