import { useEffect, useState } from "react";
import servicesWeather from "../services/servicesWeather";

const Language = ({ language }) => {
    return (
        <li>
            {language}
        </li>
    )
}

const Languages = ({ languages }) => {
    console.log();
    //
    return (
        <div>
            <h3>{Object.values(languages).length > 1 ? "Languages: " : "Language"}</h3>
            <ul>
                {Object.values(languages).map(language => <Language language={language} key={language} />)}
            </ul>
        </div>
    )
}

const Flag = ({ flag }) => {
    return (
        <div>
            <h3>Flag</h3>
            <img src={flag.png} alt={flag.alt} />
        </div>
    )
}

const Weather = ({ countryName, capital }) => {

    const [weatherObject, setWeatherObject] = useState({ temp: "", wind: "", iconSrc: "" })

    const loadWeatherData = () => {
        servicesWeather
            .getCityWeather(capital)
            .then(response => {
                console.log(response)
                setWeatherObject({
                    iconSrc: "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png",
                    temp: response.main.temp,
                    wind: response.wind.speed
                })
                console.log("zapisano");
            })
            .catch(response => {
                console.log(response)
            })
    }

    useEffect(loadWeatherData, [])

    return (
        <div>
            <b>temperature:</b> {weatherObject.temp} Celcius
            <br />
            <img src={weatherObject.iconSrc} alt="weather icon" />
            <br />
            <b>wind:</b> {weatherObject.wind} m/s
        </div>
    )
}

const CountryPage = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <b>Capital:</b> {country.capital}
            <br />
            <b>Area:</b> {country.area}
            <Languages languages={country.languages} />
            <Flag flag={country.flags} />
            <Weather countryName={country.name.common} capital={country.capital} />
        </div >
    )
}

export default CountryPage