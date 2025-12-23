import { getWeather} from "./handlers.js"
const main = () => {
    const btn = document.querySelector(".fetch-button")
    btn.addEventListener("click", async () => {
        try {
        const res = await getWeather()
        console.log(res)
        const location = document.querySelector(".location")
        const contentTemp = document.querySelector(".content-temperature")
        const contentTempRange = document.querySelector(".content-temp-range")
        const contentWeather = document.querySelector(".content-weather")
        const weatherIcon = document.querySelector(".weather-icon") 
        const contentFeels = document.querySelector(".content-feels-like")
        const weekdayDisplay = document.querySelector(".weekday-display")
        const monthDisplay = document.querySelector(".month-display")
        const weather = res.weather[0].main.toLowerCase()
        const curLocation = res.name
        const temp = Math.round(res.main.temp)
        const date = new Date((res.dt + res.timezone) * 1000)

        const curDay = new Intl.DateTimeFormat('en-En', {
            day: '2-digit'
        }).format(date)

        const curMonth = new Intl.DateTimeFormat('en-En', {
            month: 'short'
        }).format(date)

        const curYear = new Intl.DateTimeFormat('en-En', {
            year: 'numeric',
        }).format(date)

        const weekday = new Intl.DateTimeFormat('en-En', {
            weekday: 'long'
        }).format(date)

        const feels = Math.round(res.main.feels_like)
        const maxRange = Math.round(res.main.temp_max)
        const minRange = Math.round(res.main.temp_min)

        weekdayDisplay.textContent = `${weekday} `
        monthDisplay.textContent = `${curDay}.` + `${curMonth}.` + `${curYear}`



        location.textContent = `${curLocation} ` 
        contentFeels.textContent = `feels like ${feels}`
        contentTemp.textContent = `${temp}°C`
        contentTempRange.textContent = `High: ${maxRange} Low: ${minRange}` 

        if (weather === "clouds") {
            weatherIcon.src = "./assets/clouds.gif"
            weatherIcon.classList.add("weather-icon-clouds")
            contentWeather.textContent = "Cloudy"
        } else if (weather === "rain") {
            weatherIcon.src = "./assets/rain.gif"
            weatherIcon.classList.add("weather-icon-rain")
            contentWeather.textContent = "Rain"
        } else if (weather === "snow") {
            weatherIcon.src = "./assets/snow.gif"
            weatherIcon.classList.add("weather-icon-snow")
            contentWeather.textContent = "Snow"
        } else if (weather === "clear") {
            weatherIcon.src = "./assets/clear.gif"
            weatherIcon.classList.add("weather-icon-clear")
            contentWeather.textContent = "Clear"
        } else if (weather === "atmosphere") {
            weatherIcon.src = "./assets/clouds.gif"
            weatherIcon.classList.add("weather-icon-clouds")
            contentWeather.textContent = "Fog"
        } else if (weather === "drizzle") {
            weatherIcon.src = "./assets/rain.gif"
            contentWeather.textContent = "Drizzle"
        } else {
            weatherIcon.src = "./assets/thunder.gif"
            contentWeather.textContent = "Thunder"
        }
        } catch(e) {
            alert("error")
            console.log(e)
        }
        
    })
}

import { getCatFact } from "./handlers.js"
const secondBar = () => {
    const catBtn = document.querySelector(".cat-button")
    catBtn.addEventListener("click", async () => {
        try {
            const catRes = await getCatFact()
            console.log(catRes)

            const factsArray = catRes.data
            const randomIndex = Math.floor(Math.random() * factsArray.length)
            const randomFact = factsArray[randomIndex].fact
            const factsContent = document.querySelector(".cat-fact")
            factsContent.textContent = randomFact
        } catch(e) {
            alert("error")
            console.log(e)
        }
    })
}

import { getForecast } from "./handlers.js"
const forecastCard = () => {
    const forecastBtn = document.querySelector(".forecast-button")
    forecastBtn.addEventListener("click", async () => {
        try {
            const forecastRes = await getForecast()
            console.log(forecastRes)

            const timezoneOffset = forecastRes.city.timezone
            const forecastGenerator = document.querySelector('.forecast-12-hours')

            forecastGenerator.innerHTML = ''

            const next4Forecast = forecastRes.list.slice(0, 4)
            next4Forecast.forEach((forecast) => {
                const forecastDiv = document.createElement('div')
                forecastDiv.classList.add('forecast-today', 'filled')

            const timeDiv = document.createElement('div')
            timeDiv.classList.add('forecast-time')
            const forecastTimestamp = (forecast.dt + timezoneOffset) * 1000
            const date = new Date(forecastTimestamp)
            const hours = date.getUTCHours().toString().padStart(2, '0')
            const minutes = date.getMinutes().toString().padStart(2, '0')
            timeDiv.textContent = `${hours}:${minutes}`

            const iconImg = document.createElement('img')
            iconImg.classList.add('forecast-icon')
            const weatherMain = forecast.weather[0].main.toLowerCase()
            let gifUrl = './assets/thunder.gif'
            if (weatherMain.includes('cloud')) {
                gifUrl = './assets/clouds.gif'
            } else if (weatherMain.includes('rain')) {
                gifUrl = './assets/rain.gif'
            } else if (weatherMain.includes('snow')) {
                gifUrl = './assets/snow.gif'
            } else if (weatherMain.includes('clear')) {
                gifUrl = './assets/clouds.gif'
            } else if (weatherMain.includes('drizzle')) {
                gifUrl = './assets/rain.gif'
            } else if (weatherMain.includes('atmosphere')) {
                gifUrl = './assets/clouds.gif'
            } else {
                 gifUrl = './assets/thunder.gif'
            }
                iconImg.src = gifUrl
                iconImg.alt = weatherMain

            const tempDiv = document.createElement('div')
            tempDiv.classList.add('forecast-temp')
            tempDiv.textContent = `${Math.round(forecast.main.temp)}°`

            forecastDiv.appendChild(timeDiv)
            forecastDiv.appendChild(iconImg)
            forecastDiv.appendChild(tempDiv)

            forecastGenerator.appendChild(forecastDiv)

            })
        } catch(e) {
            console.log(e)
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    main(), secondBar(), forecastCard()
})
