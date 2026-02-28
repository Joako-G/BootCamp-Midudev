import Job from "./Job"
import styles from './Jobs.module.css'

export function Jobs({ jobs }) {
    return (
        <>
            <h2 className={styles.titleResults}>Resultados de búsqueda</h2>
            <div className={styles.jobsListings}>
                {
                    jobs?.length === 0 && (
                        <p style={{ padding: "15px", textAlign: "center"}} className="no-results">
                            No se encontraron resultados para tu búsqueda
                        </p>
                    )
                }
                {
                    jobs?.map((job) => (
                        <Job key={job.id} job={job} />
                    ))
                }
            </div>
        </>
    )
}