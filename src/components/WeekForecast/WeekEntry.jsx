import weatherList from "./WeatherList"
import styles from "./WeekEntry.module.scss"

const WeekEntry = ({ entry }) => {
    const dateObj = new Date(entry.date + "T00:00:00")
    const weekday = new Intl.DateTimeFormat('en-En', { weekday: 'short' }).format(dateObj)
    const weather = weatherList[entry.code]
    console.log(entry.date)

    return <div className={styles.container}>
        <div>{weekday}</div>
        <img className = {styles.icon} src={weather.img}/>
        <div className={styles.weather}>{weather.label}</div>
        <div className={styles.temp}>{Math.floor(entry.max)}/{Math.floor(entry.min)}°</div>
    </div>
}

export default WeekEntry