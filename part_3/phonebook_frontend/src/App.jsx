import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import FilterInput from './components/FilterInput'
import servicesPhonebook from "./services/servicesPhonebook"
import Notification from './components/Norification'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterInput, setFilterInput] = useState('')
  const [message, setMessage] = useState({ error: false, text: "" })

  const isOtherThan = (text, text2) => {
    if (text === text2) return false
    return true
  }

  const loadData = () => {
    servicesPhonebook
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }

  const addPerson = (newPerson) => {
    if (persons.every(person => isOtherThan(person.name, newPerson.name))) {
      servicesPhonebook
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          showMessage("Added " + response.name, false)
        })
        .catch(response => {
          showMessage(response.response.data.error, true)
          console.log(response.response.data.error)
        })

    } else {
      if (window.confirm(newPerson.name + " is already added to phonebook, replace the old number with a new one?")) {
        const id = persons.find(n => n.name === newPerson.name).id
        servicesPhonebook
          .update(id, newPerson)
          .then(response => {
            setPersons(persons.map(n => n.id !== id ? n : newPerson))
            showMessage("Change contact number for " + response.name, false)
          })
          .catch(response => {
            console.log(response)
            showMessage("Infromation of " + newPerson.name + " has already been removed from server", true)
          })
      }
    }
  }

  const removeHandler = (id) => {
    if (window.confirm("Delete " + persons.find(n => n.id === id).name + " ?")) {
      servicesPhonebook
        .remove(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
          showMessage("Deleted " + persons.find(n => n.id === id).name, true)
          console.log(response);
        })
        .catch(response => console.log(response))
    }
  }

  const showMessage = (txt, isError) => {
    setMessage({ error: isError, text: txt })
    setTimeout(() => {
      setMessage({ text: "" })
    }, 4000)

  }

  useEffect(loadData, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {message.text !== "" ? <Notification message={message} /> : null}
      <FilterInput input={filterInput} setInput={setFilterInput} />
      <h3>Add a new</h3>
      <PersonForm addPersonHandler={addPerson} />
      <h3>Numbers</h3>
      <Persons personsList={persons} filterInput={filterInput} removeHandler={removeHandler} />
    </div>
  )
}

export default App