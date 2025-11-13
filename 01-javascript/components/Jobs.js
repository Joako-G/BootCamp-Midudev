
export function Jobs(jobs, currentPage, RESULTS_PER_PAGE) {
    // console.log('Jobs: ', jobs);
    
    const container = document.querySelector('.jobs-listings')
    container.innerHTML = ''

    const startIndex = (currentPage - 1) * RESULTS_PER_PAGE
    const endIndex = startIndex + RESULTS_PER_PAGE

    const jobsToShow = jobs.slice(startIndex, endIndex)

    jobsToShow.forEach(job => {
        const article = document.createElement('article')
        article.className = 'job-listing-card'

        article.dataset.technology = job.data.technology
        article.dataset.ubication = job.data.modalidad
        article.dataset.experience = job.nivel

        article.innerHTML =
            `
            <div>
                <h3> ${job.titulo} </h3>
                <small> ${job.empresa} | ${job.ubicacion} </small>
                <p> ${job.descripcion} </p>
            </div>
            <button class="button-apply-job"> Aplicar</button>
        `
        container.appendChild(article)
    });
}
