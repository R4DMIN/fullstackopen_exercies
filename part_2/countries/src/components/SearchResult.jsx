import CountryPage from "./CountryPage"
import Message from "./Message";

const SearchResult = ({ searchResult, selectHandler }) => {
    console.log(searchResult);

    return (
        <div>
            <h3>Result: </h3>
            {
                !searchResult ? <Message message={"Enter a country name to search"} color={"gray"} />
                    : searchResult.length === 0 ? <Message message={"no results refine your filter"} color={"red"} />
                        : searchResult.length === 1 ? <CountryPage country={searchResult[0]} />
                            : searchResult.length > 10 ? <Message message={"Too many matches, specify another filter"} color={"gray"} />
                                : searchResult.length < 10 ? searchResult.map(result => <SelectCountry key={result.name.common} countryName={result.name.common} selectHandler={() => selectHandler(result.name.common)} />) : "mamy ERROR"
            }
        </div>
    )
}

const SelectCountry = ({ countryName, selectHandler }) => {
    return (
        <div>
            {countryName} <button onClick={selectHandler}>Select</button>
        </div>
    )
}

export default SearchResult