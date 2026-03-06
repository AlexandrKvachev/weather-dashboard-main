const API_URL ='https://api.openweathermap.org'
const OPENWEATHER_KEY = '74aa02f1502c32565edd08223b2e45d8'

export const getWeather = async (lat, lon) => {
    const res = await fetch(`${API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=metric`)
    return res.json()
}

const CAT_API_URL ='https://catfact.ninja/facts'

export const getCatFact = async () => {
    const catRes = await fetch (CAT_API_URL)
    return catRes.json()
}

const FORECAST_API_URL = 'https://api.openweathermap.org'

export const getForecast = async (lat, lon) => {
    const forecastRes = await fetch(`${API_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=metric`)
    return forecastRes.json()
}

const GEOAPIFY_API_URL = 'https://api.geoapify.com/v1/geocode/autocomplete'
const API_KEY = '96bbbe772980435885ccf7818685d7f6'

export const getCities = async (prefix) => {
    const res = await fetch(
        `${GEOAPIFY_API_URL}?text=${encodeURIComponent(prefix)}&limit=5&apiKey=${API_KEY}`
    )

    const data = await res.json()

    return data.features.map(item => ({
        name: item.properties.city || item.properties.name,
        lat: item.properties.lat,
        lon: item.properties.lon
    }))
}

const EXCHANGE_API_URL = 'https://api.freecurrencyapi.com'

export const getExchange = async () => {
    const exchangeRes = await fetch(EXCHANGE_API_URL + "/v1/latest?apikey=fca_live_3YBRMjNsWX5Wxw91OfpkOvuhAG82TwrCHUmO9Bpq")
    return exchangeRes.json()
}
