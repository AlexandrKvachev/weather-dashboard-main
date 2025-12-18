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
        const timeDisplay = document.querySelector(".time-display")
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

        const hours = date.getUTCHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')

        const time = `${hours}:${minutes}`
        const weekday = new Intl.DateTimeFormat('en-En', {
            weekday: 'long'
        }).format(date)


        timeDisplay.textContent = `${time} `
        weekdayDisplay.textContent = `${weekday} `
        monthDisplay.textContent = `${curDay}.` + `${curMonth}.` + `${curYear}`



        location.textContent = `${curLocation} ` 
        content.textContent = `Current temperature is ${temp}°C, ` + `and the weather is ${weather}`

        if (weather === "clouds") {
            weatherIcon.src = "./assets/clouds.gif"
            weatherIcon.classList.add("weather-icon-clouds")
        } else if (weather === "rain") {
            weatherIcon.src = "./assets/rain.gif"
            weatherIcon.classList.add("weather-icon-rain")
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

document.addEventListener("DOMContentLoaded", () => {
    main(), secondBar()
})
