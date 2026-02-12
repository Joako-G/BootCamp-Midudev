export function jobsFiltered(jobs, text, { technology, ubication, experience }) {
    const jobsFilteredWithFilter = jobs.filter((job) => {
        return (technology ? job.data.technology === technology : true) &&
            (ubication ? job.data.modalidad === ubication : true) &&
            (experience ? job.data.nivel === experience : true)
    })

    const jobsFilteredWithText = jobsFilteredWithFilter.filter((job) => {
        return (text ? job.titulo.toLowerCase().includes(text.toLocaleLowerCase()) : true)
    })

    return jobsFilteredWithText
}