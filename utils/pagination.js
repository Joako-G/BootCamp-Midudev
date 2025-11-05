import { Jobs } from '../components/Jobs.js'
import { renderButtonPagination } from '../components/Button.js'

export function pagination(jobs, currentPage, RESULTS_PER_PAGE) {
    const buttonPagination = document.querySelector('.pagination')

    buttonPagination.addEventListener('click', function (event) {
        const element = event.target

        if (element.classList.contains('button-page')) {

            currentPage = Number(element.textContent)
            Jobs(jobs, currentPage, RESULTS_PER_PAGE)
            renderButtonPagination(jobs, currentPage, RESULTS_PER_PAGE)
        }
    })

}