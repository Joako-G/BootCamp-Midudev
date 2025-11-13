/** FILTROS */
import { jobs } from '../utils/fetch-data.js'
import { Jobs } from '../components/Jobs.js'
import { renderButtonPagination } from '../components/Button.js'
import { pagination } from './pagination.js'

const filterTechnology = document.querySelector('#filter-technology')

filterTechnology.addEventListener('change', function () {
    const technologyValue = filterTechnology.value
    const ubicationValue = filterUbication.value

    const filterJob = jobs.filter((job) => {
        const technology = job.data.technology
        return technologyValue === "" ?
            (job)
            :
            (technology === technologyValue)
    })

    Jobs(filterJob, 1, 3)
    renderButtonPagination(filterJob, 1, 3)
    pagination(filterJob, 1, 3)

})



const filterUbication = document.querySelector('#filter-ubication')

filterUbication.addEventListener('change', function () {
    const ubicationValue = filterUbication.value
    const technologyValue = filterTechnology.value

    const filterJob = jobs.filter((job) => {
        const modalidad = job.data.modalidad
        const technology = job.data.technology
        return ubicationValue === "" ?
            (job)
            :
            (modalidad === ubicationValue)

    })

    Jobs(filterJob, 1, 3)
    renderButtonPagination(filterJob, 1, 3)
    pagination(filterJob, 1, 3)



    // jobs.forEach((job) => {
    //     const modalidad = job.dataset.ubication
    //     const technology = job.dataset.technology

    //     const isShown = (ubicationValue === "" || ubicationValue === modalidad) && (technologyValue === "" || technologyValue === technology)

    //     job.classList.toggle('is-hiden', !isShown)

    // })

})

const filterExperience = document.querySelector('#filter-experience')

filterExperience.addEventListener('change', function () {
    console.log('Nivel de experiencia elegido: ', filterExperience.value)
})

const searchInput = document.querySelector('#eploye-search-input')

searchInput.addEventListener('input', function () {
    console.log('Buscando empleos por: ', searchInput.value)
})


const employeeSearchForm = document.querySelector('#employee-search-form')

employeeSearchForm.addEventListener('submit', function (event) {
    event.preventDefault()
    console.log('Formulario enviado')
})

