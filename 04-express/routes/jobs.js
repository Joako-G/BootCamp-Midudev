import { Router } from "express";
import { JobController } from "../controller/jobs.js";
import { validateJob, validatePartialJob } from "../controller/schemas/jobs.js";

export const jobsRouter = Router()

function validateCreate(req, res, next) {
    const result = validateJob(req.body)

    if (result.success) {
        req.body = result.data
        return next()
    }

    return res.status(400).json({ error: 'Invalid request', detail: result.error })
}

function validateUpdate(req, res, next) {
    const result = validatePartialJob(req.body)

    if (!result.success) return res.status(400).json({ error: JSON.parse(result.error.message) })

    req.body = result.data

    next()
}

jobsRouter.get('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getId)

jobsRouter.post('/', validateCreate, JobController.create)

jobsRouter.put('/:id', JobController.update)
jobsRouter.patch('/:id', JobController.updatePartial)

jobsRouter.delete('/:id', JobController.delete)
