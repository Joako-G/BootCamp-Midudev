import { JobModel } from "../model/jobs.js"

export class JobController {
    static async getAll(req, res) {
        const { total, limitNumber, offsetNumber, result, paginationJobs } = await JobModel.getAll({ ...req.query })

        return res.json({ total: total, limit: limitNumber, offset: offsetNumber, result: result, data: paginationJobs })
    }

    static async getId(req, res) {
        const { id } = req.params

        const job = await JobModel.getId({ id })

        if (!job) {
            return res.status(404).json({ error: 'Job Not Found' })
        }

        return res.status(200).json(job)
    }

    static async create(req, res) {
        // const { titulo, empresa, ubicacion, descripcion, data, content } = req.body

        const newJob = await JobModel.create({ ...req.body })

        return res.status(201).json(newJob)
    }

    static async update(req, res) {
        const { id } = req.params

        const updatedJob = await JobModel.update({ id, input: req.body })

        if (updatedJob == null) {
            return res.status(404).json({ message: 'Job Not Found' })
        }

        if (updatedJob === 'INVALID_DATA') {
            return res.status(400).json({ message: ' Request body cannot be empty' })
        }

        return res.status(200).json({ message: "Job update: ", updatedJob })
    }

    static async updatePartial(req, res) {
        const { id } = req.params

        const updatedJob = await JobModel.updatePartial({ id, input: req.body })

        if (updatedJob === null) {
            return res.status(404).json({ message: 'Job Not Found' })
        }

        return res.status(200).json({ message: 'Job Updated' })
    }

    static async delete(req, res) {
        const { id } = req.params

        const deletedJob = await JobModel.delete({ id })

        if (!deletedJob) return res.status(404).json({ message: 'Job Not Found' })

        return res.status(200).json({ job: 'Job elimineted: ', deletedJob })
    }

}