import express from 'express'
import cors from 'cors'

import jobs from './jobs.json' with { type: 'json'}
import { DEFAULTS } from './config.js'

const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:5173',
]

const PORT = process.env.PORT ?? 1234

const app = express()

app.use(cors({
    origin: (origin, callback) => {
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error('Origen no permitido'))
    }
}))
app.use(express.json())

app.get('/jobs', (req, res) => {
    const { text, technology, type, title, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.OFSSET_PAGINATION } = req.query

    let jobsFiltered = jobs

    if (text) {
        const searchTerm = text.toLowerCase()
        jobsFiltered = jobs.filter((job) => job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm))
    }

    if (technology) {
        const searchTerm = technology.toLowerCase()
        jobsFiltered = jobs.filter((job) => {
            return job.data.technology.some(tech => tech.toLowerCase() === searchTerm)
        })
    }

    if (type) {
        const searchTerm = type.toLowerCase()
        jobsFiltered = jobs.filter((job) => job.data.modalidad.toLowerCase() === searchTerm)
    }

    if (title) {
        const searchTerm = title.toLowerCase()
        jobsFiltered = jobs.filter((job) => job.titulo.toLowerCase().includes(searchTerm))
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginationJobs = jobsFiltered.slice(offsetNumber, offsetNumber + limitNumber)

    return res.json({ data: paginationJobs, total: jobsFiltered.length, limit: limitNumber, offset: offsetNumber })
})

app.get('/jobs/:id', (req, res) => {
    const { id } = req.params

    const job = jobs.find(job => job.id === id)

    if (!job) {
        return res.status(404).json({ error: 'Job Not Found' })
    }

    return res.json(job)
})

app.post('/jobs', (req, res) => {
    // Peticion para crear una nueva oferta de trabajo
    console.log("BODY:", req.body)
    const { titulo, empresa, ubicacion, descripcion, data, content } = req.body

    const newJob = {
        id: crypto.randomUUID(),
        titulo,
        empresa,
        ubicacion,
        descripcion,
        data,
        content
    }

    jobs.push(newJob)

    return res.status(201).json(newJob)
    // return res.json(newJob)
})

app.put('/jobs/:id', (req, res) => {
    const { id } = req.params
    const { titulo, empresa, ubicacion, descripcion, data, content } = req.body

    let indexJob = jobs.findIndex(job => job.id === id)

    if (indexJob === -1) {
        return res.status(404).json({ message: 'Job Not Found' })
    }

    jobs[indexJob] = {
        ...jobs[indexJob],
        titulo,
        empresa,
        ubicacion,
        descripcion,
        data,
        content
    }

    return res.status(200).json({ message: "Job update" })
    // Peticion para actualizar un recurso completo
})

app.patch('/jobs/:id', (req, res) => {
    // Peticion para actualizar un recurso de forma parcial
    const { id } = req.params
    const { titulo, empresa, ubicacion, descripcion, data, content } = req.body

    console.log('Index: ', id)
    let indexJob = jobs.findIndex(job => job.id === id)
    console.log('Index Job: ', indexJob)

    if (indexJob === -1) {
        return res.status(404).json({ message: 'Job Not Found' })
    }

    jobs[indexJob] = {
        ...jobs[indexJob],
        titulo: titulo ?? jobs[indexJob].titulo,
        empresa: empresa ?? jobs[indexJob].empresa,
        ubicacion: ubicacion ?? jobs[indexJob].ubicacion,
        descripcion: descripcion ?? jobs[indexJob].descripcion,
        data: data ?? jobs[indexJob].data,
        content: content ?? jobs[indexJob].content
    }

    return res.status(200).json({ message: 'Job Updated' })

})

app.delete('/jobs/:id', (req, res) => {
    // Peticion para eliminar un recurso
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)

})