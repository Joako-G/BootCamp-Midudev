import express from 'express'
import jobs from './jobs.json' with { type: 'json'}
import { DEFAULTS } from './config.js'

const PORT = process.env.PORT ?? 1234
const app = express()

app.use((req, res, next) => {
    const timeString = new Date().toLocaleDateString()
    console.log(`[${timeString}] ${req.method} ${req.url}`)
    next()
})

app.get('/health', (reques, res) => {
    return res.json({
        status: 'ok',
        uptime: process.uptime()
    })
})

app.get('/jobs', (req, res) => {
    const { text, technology, location, title, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.OFSSET_PAGINATION } = req.query

    let jobsFiltered = jobs


    if (text) {
        const searchTerm = text.toLowerCase()
        jobsFiltered = jobs.filter((job) => job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm))
    }

    if (technology) {
        const searchTerm = technology.toLowerCase()
        jobsFiltered = jobs.filter((job) =>
            job.data.technology.some(tech => tech.toLowerCase().includes(searchTerm))
        )
    }

    if (location) {
        const searchTerm = location.toLowerCase()
        jobsFiltered = jobs.filter((job) => job.ubicacion.toLowerCase().includes(searchTerm))
    }

    if ( title ) {
        const searchTerm = title.toLowerCase()
        jobsFiltered = jobs.filter( (job) => job.titulo.toLowerCase().includes(searchTerm))
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginationJobs = jobsFiltered.slice(offsetNumber, offsetNumber + limitNumber)

    return res.json(paginationJobs)
})

app.get('/jobs/:id', (req, res) => {
    const { id } = req.params

    const idNumber = Number(id)

    return res.json({
        job: { id: idNumber, title: `Job with id ${id}` }
    })
})

app.post('/jobs', (req, res) => {
    // Peticion para crear una nueva oferta de trabajo

})

app.put('/jobs/:id', (req, res) =>{
    // Peticion para actualizar un recurso completo
})

app.patch('/jobs/:id', (req, res) => {
    // Peticion para actualizar un recurso de forma parcial
})

app.delete('/jobs/:id', (req, res) => {
    // Peticion para eliminar un recurso
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)

})