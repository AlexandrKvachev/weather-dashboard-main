const API_URL ='https://api.openweathermap.org'

export const getWeather = async () => {
    const res = await fetch(API_URL + "/data/2.5/weather?lat=51.51138&lon=-0.084039&appid=74aa02f1502c32565edd08223b2e45d8&units=metric")
    return res.json()
}

const CAT_API_URL ='https://catfact.ninja/facts'

export const getCatFact = async () => {
    const catRes = await fetch (CAT_API_URL)
    return catRes.json()
}

const FORECAST_API_URL = 'https://api.openweathermap.org'

export const getForecast = async () => {
    const forecastRes = await fetch(FORECAST_API_URL + "/data/2.5/forecast?lat=51.51138&lon=-0.084039&appid=74aa02f1502c32565edd08223b2e45d8&units=metric")
    return forecastRes.json()
}