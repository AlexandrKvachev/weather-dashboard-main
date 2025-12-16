import { getWeather} from "./handlers.js"
const main = () => {
    const btn = document.querySelector(".fetch-button")
    btn.addEventListener("click", async () => {
        try {
        const res = await getWeather()
        console.log(res)
        const content = document.querySelector(".content")
        const weatherIcon = document.querySelector(".weather-icon")
        const weather = res.weather[0].main.toLowerCase()
        const temp = Math.round(res.main.temp)
        content.textContent = `Current temperature is ${temp}°C, ` + `and the weather is ${weather}`

        if (weather === "clouds") {
            weatherIcon.src = "./assets/clouds.jpg"
        } else if (weather === "rain") {
            weatherIcon.src = "./assets/rain.jpg"
        } else if (weather === "snow") {
            weatherIcon.src = "./assets/snow.jpg"
        } else if (weather === "clear") {
            weatherIcon.src = "./assets/clear.jpg"
        } else if (weather === "atmosphere") {
            weatherIcon.src = "./assets/fog.jpg"
        } else if (weather === "drizzle") {
            weatherIcon.src = "./assets/drizzle.jpg"
        } else {
            weatherIcon.src = "./assets/thunder.jpg"
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
