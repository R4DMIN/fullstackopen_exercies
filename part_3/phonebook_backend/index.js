const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status - :response-time ms :body' ))

app.use(express.json()) // for read json

let phonebookData = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    let newId = Math.floor(Math.random() * 10000)

    while (!(!(phonebookData.find(p => p.id === newId)))) {
        newId = Math.floor(Math.random() * 10000)
        console.log('generate again');
    }
    console.log(`new ID:${newId}`);

    return newId
}

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
//app.use(requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const phonebookLength = phonebookData.length
    var date = new Date();

    response.send(`<div>Phonebook has info for ${phonebookLength} people</div><div>${date}</div>`)
})

app.get('/api/persons/', (request, response) => {
    console.log("GET phonebook ALL");
    response.json(phonebookData)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebookData.find((p) => p.id === id)

    if (person) {
        console.log(`load person with ${id}`);
        return response.json(person)
    } else {
        console.log(`"no data with this id"`);
        return response.status(404).json({ error: "no data with this id" })
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    if (!phonebookData.find((p) => p.id === id)) {
        console.log(`no person witch this id:${id}`);
        return response.status(400).json({ error: "no user with this id" })
    } else {
        phonebookData = phonebookData.filter((person) => person.id !== id)
        console.log(`delete person with ${id}`);
        return response.status(204).end()
    }
})

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        console.log("POST The name or number is missing")
        return response.status(400).json({ error: "The name or number is missing" })
    }

    if (!!(phonebookData.find(p => p.name === body.name))) {
        console.log("POST The name already exists in the phonebook")
        return response.status(400).json({ error: "The name already exists in the phonebook" })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    phonebookData = phonebookData.concat(person)
    console.log(`POST new person id:${person.id}`);
    response.status(200).json(person)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})