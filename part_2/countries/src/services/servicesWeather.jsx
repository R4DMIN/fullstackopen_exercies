import axios from "axios";
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather'

const getCityWeather = (city) => {
    console.log("loading weather for " + city);
    const apiKey = import.meta.env.VITE_API_KEY_OPENWEATHER
    console.log("loading weather for " + apiKey);
    console.log(weatherUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric");
    const request = axios.get(weatherUrl + "?q=" + city + "&appid=" + apiKey + "&units=metric")
    return request.then(reponse => reponse.data)
}

export default { getCityWeather }