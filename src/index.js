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
        // contentFeels.textContent = `feels like ${feels}`
        contentTemp.textContent = `${temp}°`
        // contentTempRange.textContent = `High: ${maxRange} Low: ${minRange}` 

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
            TempDiv.textContent = `${Math.floor(max)}/${Math.floor(min)}°C`

            const dailyImg = document.createElement('img')
            dailyImg.classList.add('daily-icon')
            let imgUrl = './assets/thunder.png'
            if (code === 2 || code === 3) {
                weatherDiv.textContent = 'Clouds'
                imgUrl = './assets/clouds.png'
            } else if (code === 61 || code === 63 || code === 65 || code === 66 || code === 67) {
                imgUrl = './assets/rain.png'
                weatherDiv.textContent = 'Rain'
            }else if (code === 71 || code === 73 || code === 75 || code === 77) { 
                imgUrl = './assets/snow.png'
                weatherDiv.textContent = 'Snow'
            }else if (code === 0 || code === 1) {
                imgUrl = './assets/clear.png'
                weatherDiv.textContent = 'Clear'
            }else if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) {
                imgUrl = './assets/rain.png'
                weatherDiv.textContent = 'Drizzle'
           } else if (code === 45 || code === 48) {
                imgUrl = './assets/clouds.png'
                weatherDiv.textContent = 'Fog'
            } else if (code === 95 || code === 96 || code === 99 || code === 80) {
                imgUrl = './assets/thunder.png'
                weatherDiv.textContent = 'Thunder'
            }

            dailyImg.src = imgUrl

            weekForecastDiv.appendChild(dailyDate)
            weekForecastDiv.appendChild(dailyImg)
             weekForecastDiv.appendChild(weatherDiv)
            weekForecastDiv.appendChild(TempDiv)
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
            let imgUrl = './assets/thunder.png'
            if (weatherMain.includes('cloud')) {
                imgUrl = 'assets/clouds.png'
            } else if (weatherMain.includes('rain')) {
                imgUrl = './assets/rain.png'
            } else if (weatherMain.includes('snow')) {
                imgUrl = './assets/snow.png'
            } else if (weatherMain.includes('clear')) {
                imgUrl = './assets/clear.png'
            } else if (weatherMain.includes('drizzle')) {
                imgUrl = './assets/rain.png'
            } else if (weatherMain.includes('atmosphere')) {
                imgUrl = './assets/clouds.png'
            } else {
                 imgUrl = './assets/thunder.png'
            }
                iconImg.src = imgUrl
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


const additionInfoCard = async (res) => {
        try { 
            console.log('wind', res?.wind)
            console.log('main', res?.main)
            const informationGenerator = document.querySelector('.addit-information')

            informationGenerator.innerHTML = ''

            const windSpeed = Math.round(res.wind.speed * 3.6)
            const feelsLike = Math.round(res.main.feels_like)
            const tempMax = Math.round(res.main.temp_max)
            const tempMin = Math.round(res.main.temp_min)

            const items = [
                {icon: './assets/wind.png' ,label: 'Wind', value: `${windSpeed} km/h`},
                {icon: './assets/thermometer.png', label: 'Feels like', value: `${feelsLike} °C`},
                {icon: './assets/minMax3.png', label: 'High / Low', value: `${tempMax} / ${tempMin}`}
            ]

            items.forEach(({icon, label, value}) => {
                const addInformation = document.createElement('div')
                addInformation.classList.add('information-today')

                const iconImg = document.createElement('img')
                iconImg.classList.add('status-icon')
                iconImg.src = icon
                iconImg.alt = label

                const labelDiv = document.createElement('div')
                labelDiv.classList.add('information-name')
                labelDiv.textContent = label

                const valueDiv = document.createElement('div')
                valueDiv.classList.add('information-value')
                valueDiv.textContent = value

                addInformation.appendChild(iconImg)
                addInformation.appendChild(labelDiv)
                addInformation.appendChild(valueDiv)
                informationGenerator.appendChild(addInformation)
            })
            }catch(e) {
            console.log(e)
        }
    }




            // const currenciesArray = ['RUB', 'EUR', 'GBP', 'CNY']
            // const currencySymbols = {
            //     RUB: '₽',
            //     EUR: '€',
            //     GBP: '£',
            //     CNY: '¥'
            // }

            // const rates = exchangeRes.data

            // currenciesArray.forEach(currency => {
            //     const rate = rates[currency]
            //     const currRate = Math.round(rate * 100) / 100

            //     if (!rate) return
            //     const exchangeDiv = document.createElement('div')
            //     exchangeDiv.classList.add('exchange-today')
            //     const valueDiv = document.createElement('div')
            //     valueDiv.classList.add('exchange-value')
            //     const exchangeName = document.createElement('div')
            //     exchangeName.classList.add('exchange-name')
            //     const toUSD = document.createElement('div')
            //     toUSD.classList.add('to-USD')
            //     exchangeName.textContent = `${currency}`
            //     valueDiv.textContent = `${currRate} ${currencySymbols[currency]}`
            //     toUSD.textContent = `to USD`

            //     exchangeDiv.appendChild(exchangeName)
            //     exchangeDiv.appendChild(valueDiv)
            //     exchangeDiv.appendChild(toUSD)
            //     exchangeGenerator.appendChild(exchangeDiv)
            // })  




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
            input.value = ''
            input.placeholder = city.name
            selectedCity.lat = city.lat 
            selectedCity.lon = city.lon 
            const res = await getWeather(city.lat, city.lon)
            renderWeather(res)
            additionInfoCard(res)
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
                        localStorage.setItem('city', input.value)
                        input.value = ''
                        inputResults.innerHTML = ''
                        inputResults.style.display = 'none'
                        isSelecting = false
                        selectedCity.lat = city.lat
                        selectedCity.lon = city.lon
                        try {
                            const res = await getWeather(city.lat, city.lon)
                            renderWeather(res)
                            forecastCard()
                            additionInfoCard(res)
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
     secondBar(), cityInput()
})
