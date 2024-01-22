const Persons = ({ personsList, filterInput, removeHandler }) => {
    return (
        <ul>
            {personsList.map((person) => filtering(person.name, filterInput) ? <Person name={person.name} number={person.number} removeButton={() => removeHandler(person.id)} key={person.id} /> : null)}
        </ul>
    )
}

const Person = ({ name, number, removeButton }) => {
    return (
        <li>{name}: {number} --- <button onClick={removeButton}>DELETE</button></li>
    )
}

const filtering = (string, subString) => {
    if (subString === "") {
        return true;
    } else {
        string = string.toLowerCase()
        subString = subString.toLowerCase()
        if (string.includes(subString)) {
            return true
        } else {
            return false
        }
    }
}

export default Persons