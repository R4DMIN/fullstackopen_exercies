require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const mongoUrl = process.env.MONGODB_URI

const isNumeric = (string) => Number.isFinite(+string)

const validateNumber = (number1) => {
    const number = number1.split('-')
    if (number.length !== 2) return false
    if (!isNumeric(number[0])) return false
    if (number[0].length < 2 || number[0].length > 3) return false
    if (!isNumeric(number[1])) return false
    if (number[1].length < 7 || number[1].length > 10) return false
    return true
}

const phonebookShema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        require: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: validateNumber,
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'Phone number required']
    }
})

mongoose
    .connect(mongoUrl)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error:', error.message)
    })

phonebookShema.set('toJSON', {
    transform: (document, retunedObject) => {
        retunedObject.id = retunedObject._id.toString()
        delete retunedObject._id
        delete retunedObject.__v
    }
})

module.exports = mongoose.model('Person', phonebookShema)

/* console.log('09-1234 ', validateNumber('09-1234'))
console.log('040-22334455 ', validateNumber('040-22334455'))
console.log('1234556 ', validateNumber('1234556'))
console.log('1-22334455 ', validateNumber('1-22334455'))
console.log('10-22-334455 ', validateNumber('10-22-334455'))
console.log('1022-334455 ', validateNumber('1022-334455'))
console.log('asd-22334455 ', validateNumber('asd-22334455'))
console.log('123-ad334455 ', validateNumber('123-ad334455'))
console.log('433-22334455 ', validateNumber('433-22334455')) */