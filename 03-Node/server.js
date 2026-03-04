import { createServer } from 'http';
import { json } from "node:stream/consumers"
import { randomUUID } from 'node:crypto';

process.loadEnvFile()

const port = process.env.PORT ?? 3000

const users = [
    { id: 1, name: 'Joaquin' },
    { id: 2, name: 'Maria' },
    { id: 3, name: 'Pedro' }
]

function sendJson(res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    return res.end(JSON.stringify(data))
}

const server = createServer(async (req, res) => {
    const { method, url } = req
    const [pathname, querystring] = url.split('?')
    const searchParams = new URLSearchParams(querystring)

    if (method === "GET") {
        if (pathname === "/users") {
            const limitParam = Number(searchParams.get("limit"))
            const offset = Number(searchParams.get("offset"))
            
            if ((Number.isNaN(limitParam) || limitParam <= 0 ) || (Number.isNaN(offset) || offset < 0) ) {
                return sendJson(res, 400, { error: "Limit and offset must be valid number" })
            }

            const limit = limitParam ? limitParam : users.length
            const paginatedUsers = users.slice(offset, offset + limit)

            return sendJson(res, 200, paginatedUsers)
        }

        if (pathname === "/health") {
            return sendJson(res, 200, { status: 'ok', uptime: process.uptime() })
        }
    }

    if (method === "POST") {
        if (pathname === "/users") {
            const body = await json(req)

            if (!body || !body.name) {
                return sendJson(res, 400, { message: "Name is required" })
            }

            const newUser = {
                name: body.name,
                id: randomUUID()
            }

            users.push(newUser)

            return sendJson(res, 201, { message: "Usuario creado" })
        }
    }

    return sendJson(res, 404, { message: 'Not found' })
})

server.listen(port, () => {
    const address = server.address()
    console.log(`Server is listening on port ${address.port}`)
})
