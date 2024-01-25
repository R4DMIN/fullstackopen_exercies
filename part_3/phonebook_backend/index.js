const express = require('express')
const app = express()
const morgan = require('morgan')
const PersonModel = require('./mongo.js')

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(express.json()) // do wcztywania formatu json
app.use(morgan(':method :url :status - :response-time ms :body'))

const generateId = () => {
    let newId = Math.floor(Math.random() * 10000)

    while (!(!(phonebookData.find(p => p.id === newId)))) {
        newId = Math.floor(Math.random() * 10000)
        console.log('generate again');
    }
    console.log(`new ID:${newId}`);

    return newId
}

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
    PersonModel
        .find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    /*     const id = Number(request.params.id)
        const person = phonebookData.find((p) => p.id === id)
        if (person) {
            console.log(`load person with ${id}`);
            return response.json(person)
        } else {
            console.log(`"no data with this id"`);
            return response.status(404).json({ error: "no data with this id" })
        } */
    PersonModel
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            }
            else {
                response.status(404).json({ error: "no data with this id" })
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    /*     const id = Number(request.params.id)
        if (!phonebookData.find((p) => p.id === id)) {
            console.log(`no person witch this id:${id}`);
            return response.status(400).json({ error: "no user with this id" })
        } else {
            phonebookData = phonebookData.filter((person) => person.id !== id)
            console.log(`delete person with ${id}`);
            return response.status(204).end()
        } */
    PersonModel
        .findByIdAndDelete(request.params.id)
        .then(requiest => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        console.log("POST The name or number is missing")
        return response.status(400).json({ error: "The name or number is missing" })
    }
    /* if (!!(phonebookData.find(p => p.name === body.name))) {
        console.log("POST The name already exists in the phonebook")
        return response.status(400).json({ error: "The name already exists in the phonebook" })
    } */

    const person = new PersonModel({
        name: body.name,
        number: body.number,
    })
    person
        .save()
        .then(result => {
            console.log(`POST new person id:${result.id}`);
            response.status(200).json(result)
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        console.log("POST The name or number is missing")
        return response.status(400).json({ error: "The name or number is missing" })
    }
    const person = {
        name: body.name,
        number: body.number,
    }
    PersonModel
        .findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatePerson => {
            response.json(updatePerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        console.log('Error: wrong id');
        return response.status(400).json({ error: 'wrong id' })
    }
    console.log(error);
    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})