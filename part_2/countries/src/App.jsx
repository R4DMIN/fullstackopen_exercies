import { useEffect, useState } from "react";
import servicesCountries from "./services/servicesCountries"
import SearchResult from "./components/SearchResult";

const App = () => {
    const [countriesData, setCountriesData] = useState(null)
    const [searchResult, setSearchResult] = useState(null)
    const [nameToFind, setNameToFind] = useState('')

    const loadData = () => {
        console.log("data loading...");
        servicesCountries
            .getAll()
            .then(response => {
                setCountriesData(response)
                console.log("data load complete");
            })
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

    const search = (value) => {
        setNameToFind(value);
        const temp = countriesData.filter(test => filtering(test.name.common, value))
        setSearchResult(temp);
    }

    useEffect(loadData, [])
    
    if (!countriesData) {
        console.log("wait for data");
    } else {
        //console.log(countriesData.find(n => n.name.common === test));
    }

    return (
        <div>
            <h3>Find countries</h3>
            <input value={nameToFind} onChange={(e) => search(e.target.value)}></input>
            <SearchResult searchResult={searchResult} selectHandler={(newResultName) => search(newResultName)} />
        </div>
    )
}

export default App