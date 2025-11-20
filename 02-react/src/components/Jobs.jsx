import react, { useState } from "react";
import Job from "./Job"
import Pagination from "./Pagination";
import Form from "./Form";

function JobsFiltered(jobs, text, { technology, ubication, experience }) {
    const jobsFilteredWithFilter = jobs.filter((job) => {
        return (technology ? job.data.technology === technology : true) &&
            (ubication ? job.data.modalidad === ubication : true) &&
            (experience ? job.data.experiencia === experience : true)
    })

    const jobsFilteredWithText = jobsFilteredWithFilter.filter((job) => {
        return (text ? job.titulo.toLowerCase().includes(text.toLocaleLowerCase()) : job)
    })

    return jobsFilteredWithText
}

function Jobs({ jobs }) {
    const JOBS_PER_PAGE = 4;

    const [filtered, setFiltered] = useState({
        technology: "",
        ubication: "",
        experience: ""
    })
    const [inputText, setInputText] = useState('')
    const [currentPage, setCurrentPage] = useState(1);

    let startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    let endIndex = startIndex + JOBS_PER_PAGE;

    const jobsWithFilters = JobsFiltered(jobs, inputText, filtered)

    const totalPages = Math.ceil(jobsWithFilters.length / JOBS_PER_PAGE);


    const shownJobs = jobsWithFilters.slice(startIndex, endIndex)

    const onSearchWithText = (text) => {
        setInputText(text)
        setCurrentPage(1)

    }

    const onSearch = (filters) => {
        setFiltered(filters)
        setCurrentPage(1)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (

        <main>
            <Form onSearch={onSearch} onSearchWithText={onSearchWithText} />
            <section>
                <h2 className="title-results">Resultados de búsqueda</h2>
                <div className="jobs-listings">
                    {
                        shownJobs.map((job) => (
                            <Job key={job.id} job={job} />
                        ))
                    }
                </div>
            </section>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageChange={handlePageChange}
            />



        </main>
    )
}

export default Jobs