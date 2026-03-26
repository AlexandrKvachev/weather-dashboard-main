import styles from "./WeatherEntry.module.scss"
import typeOfWeather from "./TypeOfWeather"


const getTime = (entry, timeZoneOffSet) => {
    const forecastTimestamp = (entry.dt + timeZoneOffSet) * 1000
    const date = new Date(forecastTimestamp)
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

const WeatherEntry = (props) => {
    const curWeather = props.entry.weather[0].main
    const curTemperature = Math.round(props.entry.main.temp) + "°"
    const image = typeOfWeather[curWeather]
    console.log(props)

    

return <div className={styles.container}>
        <div>{getTime(props.entry, props.timeZoneOffSet)}</div>
        <img className={styles.icon} src={image}/>
        <div>{curTemperature}</div>
    </div>
}

export default WeatherEntry