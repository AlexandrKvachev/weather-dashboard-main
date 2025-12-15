const API_URL ='https://api.openweathermap.org'

export const getWeather = async () => {
    const res = await fetch(API_URL + "/data/2.5/weather?lat=55.96213&lon=37.4202334&appid=74aa02f1502c32565edd08223b2e45d8&units=metric")
    return res.json()
}
