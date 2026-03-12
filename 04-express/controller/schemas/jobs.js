import * as z from 'zod'

const jobSchema = z.object({
    titulo: z.string({
        error: 'El titulo es obligatorio'
    })
        .min(10, 'El titulo debe tener al menos 10 caracteres')
        .max(100, 'El titulo no puede exceder los 100 caracteres'),
    empresa: z.string({error: 'El nombre de la empresa es obligatorio'}),
    ubicacion: z.string(),
    descripcion: z.string().optional(),
    data: z.object({
        technology: z.array(z.string()),
        modalidad: z.string(),
        nivel: z.string(),
    }),
    content: z.object({
        description: z.string(),
        responsibilities: z.string(),
        requirements: z.string(),
        about: z.string()
    }),
})

export function validateJob(input) {
    return jobSchema.safeParse(input)
}

export function validatePartialJob(input) {
    return jobSchema.partial().safeParse(input)
}