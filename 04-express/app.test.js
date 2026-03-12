import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'
import app from './app.js'

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

// SE EJECUTA UNA VEZ ANTES DE TODOS LOS TEST PARA LEVANTAR EL SERVIDOR
before(async () => {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => resolve())
        server.on('error', reject)
    })
})

describe('GET /jobs', () => {
    test('Debe responder con un 200 y un array de trabajos', async () => {
        const response = await fetch(`${BASE_URL}/jobs`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.ok(Array.isArray(json.data), 'La respuesta debe ser un array')
    })

    test('Debe filtrar trabajos por tecnologias', async () => {
        // const tech = 'react'
        // const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)

        // const type = 'remoto'
        // const response = await fetch(`${BASE_URL}/jobs?type=${type}`)

        const level = 'junior'
        const response = await fetch(`${BASE_URL}/jobs?level=${level}`)

        assert.strictEqual(response.status, 200)

        const json = await response.json()

        assert.ok(
            json.data.every(job => job.data.nivel === level),
            `$Todos los trabajos deben incluir la tecnologia  ${level}`
        )

    })

    test ('Debe buscar un trabajo por ID', async () => {

    })

})

after(async () => {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) return reject(err)
            resolve()
        })
    })
})