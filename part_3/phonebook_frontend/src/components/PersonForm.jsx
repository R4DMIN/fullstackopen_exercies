import { useState } from "react"

const PersonForm = ({ addPersonHandler }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const addPerson = (event) => {
        event.preventDefault()
        if (newName !== "") {
            const newPerson = { name: newName, number: newNumber }
            setNewName("")
            setNewNumber("")
            addPersonHandler(newPerson)
        } else alert("name is empty")
    }

    return (
        <div>
            <form onSubmit={addPerson}>
                <div>name:<input type="text" value={newName} onChange={(event) => setNewName(event.target.value)} /></div>
                <div>phone:<input type="text" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}

export default PersonForm