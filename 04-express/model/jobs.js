import jobs from '../jobs.json' with {type: 'json'}

export class JobModel {
    static async getAll({ text, technology, type, level, title, limit = 4, offset = 0 }) {
        let jobsFiltered = jobs

        if (text) {
            const searchTerm = text.toLowerCase()
            jobsFiltered = jobsFiltered.filter((job) => job.titulo.toLowerCase().includes(searchTerm) || job.descripcion.toLowerCase().includes(searchTerm))
        }

        if (technology) {
            const searchTerm = technology.toLowerCase()
            jobsFiltered = jobsFiltered.filter((job) => {
                return job.data.technology.some(tech => tech.toLowerCase() === searchTerm)
            })
        }

        if (type) {
            const searchTerm = type.toLowerCase()
            jobsFiltered = jobsFiltered.filter((job) => job.data.modalidad.toLowerCase() === searchTerm)
        }

        if (title) {
            const searchTerm = title.toLowerCase()
            jobsFiltered = jobsFiltered.filter((job) => job.titulo.toLowerCase().includes(searchTerm))
        }

        if (level) {
            const searchTerm = level.toLowerCase()
            jobsFiltered = jobsFiltered.filter((job) => job.data.nivel.toLowerCase().includes(searchTerm))
        }

        let limitNumber = Number(limit)
        let offsetNumber = Number(offset)

        if (jobsFiltered.length < limitNumber) {
            limitNumber = jobsFiltered.length
        }

        const total = jobsFiltered.length
        const result = limitNumber

        const paginationJobs = jobsFiltered.slice(offsetNumber, offsetNumber + limitNumber)

        return { total, limitNumber, offsetNumber, result, paginationJobs }
    }

    static async getId({ id }) {
        const job = jobs.find(job => job.id === id)
        return job
    }

    static async create({ titulo, empresa, ubicacion, descripcion, data, content }) {
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

        return newJob
    }

    static async update({ id, input }) {
        //OTRA MANERA DE HACER ESTO ES BUSCAR EL INDICE DEL JOB Y MODIFICARLO ATRIBUTO POR ATRIBUTO

        const job = await this.getId({ id }) // -----> ESTO DEVUELVE UNA PROMESA Y SIEMPRE DEBE IR EL AWAIT

        if (!job) return null


        if (!input.titulo || !input.empresa || !input.ubicacion || !input.descripcion || !input.data || !input.content) return 'INVALID_DATA'

        Object.assign(job, input) // -----> Esto remplaza todos los atributos del objeto job que estan en input

        return job
    }

    static async updatePartial({ id, input }) {
        const { data, content, ...rest } = input
        const job = await this.getId({ id })

        if (!job) return null

        Object.assign(job, rest)

        if (data) job.data = { ...job.data, ...data }

        if (content) job.content = { ...job.content, ...content }

        return job
    }

    static async delete({ id }) {
        const indexOf = jobs.findIndex((job) => job.id === id)

        console.log('ID: ', id)

        if (indexOf === -1) return null


        const deletedJob = jobs.splice(indexOf, 1)

        return deletedJob
    }
}

