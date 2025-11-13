// import { jobs } from '../utils/fetch-data.js'

export function renderButtonPagination(jobs, currentPage, RESULTS_PER_PAGE) {
    const paginationContainer = document.querySelector('.pagination')
    paginationContainer.innerHTML = ''
    const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE)

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button')

        button.className = 'button-page'
        button.textContent = i

        if (i === currentPage) {
            button.classList.add('is-active')
            button.disabled = true
        }

        paginationContainer.appendChild(button)
    }
}