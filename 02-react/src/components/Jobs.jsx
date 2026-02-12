import Job from "./Job"

export function Jobs({ jobs }) {
    return (
        <>
            <h2 className="title-results">Resultados de búsqueda</h2>
            <div className="jobs-listings">
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