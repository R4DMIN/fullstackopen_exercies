const express = require('express')
const app = express()
const morgan = require('morgan')
const PersonModel = require('./mongo.js')

// do obsługi z różnych adresów
const cors = require('cors')
app.use(cors())

morgan.token('body', req => {
    return JSON.stringify(req.body)
})

app.use(express.static('dist'))
app.use(express.json()) // do wcztywania formatu json
app.use(morgan(':method :url :status - :response-time ms :body'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons/', (request, response, next) => {
    console.log('GET phonebook ALL')
    PersonModel
        .find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    PersonModel
        .findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            }
            else {
                response.status(404).json({ error: 'no data with this id' })
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
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
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        console.log('POST The name or number is missing')
        return response.status(400).json({ error: 'The name or number is missing' })
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
            console.log(`POST new person id:${result.id}`)
            response.status(200).json(result)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        console.log('POST The name or number is missing')
        return response.status(400).json({ error: 'The name or number is missing' })
    }
    const person = {
        name: body.name,
        number: body.number,
    }
    PersonModel
        .findByIdAndUpdate(request.params.id, person, { runValidators: true, context: 'query' })
        .then(updatePerson => {
            response.json(updatePerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response) => {
    if (error.name === 'CastError') {
        console.log('Error: wrong id')
        return response.status(400).json({ error: 'wrong id' })
    }
    if (error.name === 'ValidationError') {
        console.log('Validation Error')
        return response.status(400).json({ error: error.message })
    }
    console.log('error code 500', error)
    response.status(500).end()
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})