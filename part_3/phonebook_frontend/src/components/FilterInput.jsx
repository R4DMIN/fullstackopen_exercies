const FilterInput = ({ input, setInput }) => {
    return (
        < div >
            filter shown with <br />
            <input value={input} onChange={(event) => setInput(event.target.value)} />
        </div>
    )
}

export default FilterInput