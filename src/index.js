import { getForecastOnWeek, getWeather} from "./handlers.js"
import { getCities } from "./handlers.js"
import { getForecast } from "./handlers.js"
import { getCatFact } from "./handlers.js"
import { getExchange } from "./handlers.js"

let selectedCity = { lat: null, lon: null}
    
    const renderWeather = (res) => {
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
            weatherIcon.classList.add("weather-icon-rain")
            contentWeather.textContent = "Drizzle"
        } else {
            weatherIcon.src = "./assets/thunder.gif"
            weatherIcon.classList.add("weather-icon-thunder")
            contentWeather.textContent = "Thunder"
        }
    }


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

const weekForecast = async () => { 
    try {
        const weekForecastRes = await getForecastOnWeek(selectedCity.lat, selectedCity.lon)
        const weekForecastContainer = document.querySelector(".week-forecast-container")
        console.log(weekForecastContainer)

        weekForecastRes.daily.time.forEach((date, index) => {
            const weekForecastDiv = document.createElement('div')
            weekForecastDiv.classList.add('week-date')
            const TempDiv = document.createElement('div')
            TempDiv.classList.add('max-temp')
            const weatherDiv = document.createElement('div')
            weatherDiv.classList.add('weather')
            const dailyDate = document.createElement('div')
            dailyDate.classList.add('date')


            const code = weekForecastRes.daily.weathercode[index]
            const max = weekForecastRes.daily.temperature_2m_max[index]
            const min = weekForecastRes.daily.temperature_2m_min[index]

            const dateObj = new Date(date)
            const weekday = new Intl.DateTimeFormat('en-En', {
                weekday: 'short'
            }).format(dateObj)

            dailyDate.textContent = weekday
            weatherDiv.textContent = `${code}`
            TempDiv.textContent = `${Math.floor(max)}/${Math.floor(min)}`

            const dailyImg = document.createElement('img')
            dailyImg.classList.add('daily-icon')
            let gifUrl = './assets/thunder.gif'
            if (code === 2 || code === 3) {
                weatherDiv.textContent = 'Clouds'
                gifUrl = './assets/clouds.gif'
            } else if (code === 61 || code === 63 || code === 65 || code === 66 || code === 67) {
                gifUrl = './assets/rain.gif'
                weatherDiv.textContent = 'Rain'
            }else if (code === 71 || code === 73 || code === 75 || code === 77) { 
                gifUrl = './assets/snow.gif'
                weatherDiv.textContent = 'Snow'
            }else if (code === 0 || code === 1) {
                gifUrl = './assets/clear.gif'
                weatherDiv.textContent = 'Clear'
            }else if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) {
                gifUrl = './assets/rain.gif'
                weatherDiv.textContent = 'Drizzle'
           } else if (code === 45 || code === 48) {
                gifUrl = './assets/clouds.gif'
                weatherDiv.textContent = 'Fog'
            } else if (code === 95 || code === 96 || code === 99) {
                gifUrl = './assets/thunder.gif'
                weatherDiv.textContent = 'Thunder'
            }

            dailyImg.src = gifUrl

            weekForecastDiv.appendChild(dailyImg)
            weekForecastDiv.appendChild(TempDiv)
            weekForecastDiv.appendChild(dailyDate)
            weekForecastDiv.appendChild(weatherDiv)
            weekForecastContainer.appendChild(weekForecastDiv)

        })
    } catch(e) {
        alert("error")
        console.log(e)
    }
}

const forecastCard = async () => {
        try {
            const forecastRes = await getForecast(selectedCity.lat, selectedCity.lon)
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
                gifUrl = './assets/clear.gif'
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
    }


const exchangeCard = async () => {
        try {
           const exchangeRes = await getExchange()
            console.log(exchangeRes) 

            
            const exchangeGenerator = document.querySelector('.exchange-container')

            exchangeGenerator.innerHTML = ''

            const currenciesArray = ['RUB', 'EUR', 'GBP', 'CNY']
            const currencySymbols = {
                RUB: '₽',
                EUR: '€',
                GBP: '£',
                CNY: '¥'
            }

            const rates = exchangeRes.data

            currenciesArray.forEach(currency => {
                const rate = rates[currency]
                const currRate = Math.round(rate * 100) / 100

                if (!rate) return
                const exchangeDiv = document.createElement('div')
                exchangeDiv.classList.add('exchange-today')
                const valueDiv = document.createElement('div')
                valueDiv.classList.add('exchange-value')
                const exchangeName = document.createElement('div')
                exchangeName.classList.add('exchange-name')
                const toUSD = document.createElement('div')
                toUSD.classList.add('to-USD')
                exchangeName.textContent = `${currency}`
                valueDiv.textContent = `${currRate} ${currencySymbols[currency]}`
                toUSD.textContent = `to USD`

                exchangeDiv.appendChild(exchangeName)
                exchangeDiv.appendChild(valueDiv)
                exchangeDiv.appendChild(toUSD)
                exchangeGenerator.appendChild(exchangeDiv)
            })



            
        }catch(e) {
            console.log(e)
        }
    }




const cityInput = () => {
    const input = document.querySelector('.user-input')
    const inputResults = document.querySelector('.result-container')
    let debounceTimer = null
    let currentRequest = 0
    let isSelecting = false

    const choosenCity = localStorage.getItem('city')
    const defoultCity = choosenCity || 'Moscow'
    const setDefoult = async () => {
        const cities = await getCities(defoultCity)
        if (cities.length > 0) {
            const city = cities[0]
            input.value = city.name
            selectedCity.lat = city.lat 
            selectedCity.lon = city.lon 
            const res = await getWeather(city.lat, city.lon)
            renderWeather(res)
            forecastCard()
            weekForecast()
        }
    }
    setDefoult()
    input.addEventListener('input', () => {
        if (isSelecting) return

        const value = input.value.trim()
        inputResults.innerHTML = ''

        if (!value) {
            inputResults.style.display = 'none'
            return
        }

        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(async () => {
            const requestId = ++currentRequest

            try {
                const cities = await getCities(value)

                if (requestId !== currentRequest) {
                    inputResults.style.display = 'none'
                    return
                }

                inputResults.innerHTML = ''
                cities.forEach(city => {
                    const li = document.createElement('li')
                    li.textContent = city.name
                    li.onclick = async () => {
                        isSelecting = true
                        input.value = city.name
                        localStorage.setItem('city', input.value)
                        inputResults.innerHTML = ''
                        inputResults.style.display = 'none'
                        isSelecting = false
                        selectedCity.lat = city.lat
                        selectedCity.lon = city.lon
                        try {
                            const res = await getWeather(city.lat, city.lon)
                            renderWeather(res)
                            forecastCard()
                        } catch(e) {
                            console.error(e)
                        }
                    }
                    inputResults.appendChild(li)
                })
                inputResults.style.display = 'block'
            } catch (e) {
                console.error(e)
            }
        }, 300)
    }) 
}


document.addEventListener("DOMContentLoaded", () => {
     secondBar(), exchangeCard(), cityInput()
})
