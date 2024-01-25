require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const mongoUrl = process.env.MONGODB_URI
const phonebookShema = new mongoose.Schema({
    name: String,
    number: String,
})

mongoose
    .connect(mongoUrl)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error:', error.message);
    })

phonebookShema.set('toJSON',{
    transform: (document, retunedObject) => {
        retunedObject.id = retunedObject._id.toString()
        delete retunedObject._id
        delete retunedObject.__v
    }
})

module.exports = mongoose.model('Person', phonebookShema)



// ehhh
/* const Person = mongoose.model('Person', phonebookShema)

const getAll = () => {
    mongoose.connect(mongoUrl)
    Person
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.name, person.number);
            })
            mongoose.connection.close()
        })
}

const save = (name, number) => {
    const person = new Person({
        name: name,
        number: number,
    })
    mongoose.connect(mongoUrl)
    person
        .save()
        .then(result => {
            console.log('person added')
            //console.log(result)
            mongoose.connection.close()
        })
} */