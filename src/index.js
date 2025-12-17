import { getWeather} from "./handlers.js"
const main = () => {
    const btn = document.querySelector(".fetch-button")
    btn.addEventListener("click", async () => {
        try {
        const res = await getWeather()
        console.log(res)
        const location = document.querySelector(".location")
        const content = document.querySelector(".content")
        const weatherIcon = document.querySelector(".weather-icon")
        const weather = res.weather[0].main.toLowerCase()
        const curLocation = res.name
        const temp = Math.round(res.main.temp)
        location.textContent = `${curLocation}`
        content.textContent = `Current temperature is ${temp}°C, ` + `and the weather is ${weather}`

        if (weather === "clouds") {
            weatherIcon.src = "./assets/clouds.gif"
            weatherIcon.classList.add("weather-icon-clouds")
        } else if (weather === "rain") {
            weatherIcon.src = "./assets/rain.gif"
        } else if (weather === "snow") {
            weatherIcon.src = "./assets/snow.gif"
            weatherIcon.classList.add("weather-icon-snow")
        } else if (weather === "clear") {
            weatherIcon.src = "./assets/clear.gif"
            weatherIcon.classList.add("weather-icon-clear")
        } else if (weather === "atmosphere") {
            weatherIcon.src = "./assets/clouds.gif"
            weatherIcon.classList.add("weather-icon-clouds")
        } else if (weather === "drizzle") {
            weatherIcon.src = "./assets/rain.gif"
        } else {
            weatherIcon.src = "./assets/thunder.gif"
        }
        } catch(e) {
            alert("error")
            console.log(e)
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    main()
})
