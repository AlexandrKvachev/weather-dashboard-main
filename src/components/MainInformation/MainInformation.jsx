import { useEffect, useState } from "react";
import { getWeather } from "../../handlers";
import MainInformationList from "./MainInformationList"
import styles from "./MainInformation.module.scss"


const MainInformation = ({selectedCity}) => {
    const [list, setList] = useState(null)
        useEffect(() => {
            if (!selectedCity) return
            const fetchData = async () => {
            const mainRes = await getWeather(selectedCity.lat, selectedCity.lon)
            setList(mainRes)
            console.log(mainRes)
            }
            fetchData()
        },[selectedCity])

        if (!selectedCity) return <div>Plug</div>
        if (!list) return <div>Plug</div>

        const temp = Math.round(list.main.temp) + "°"
        const weather = list.weather[0].main
        const date = new Date((list.dt + list.timezone) * 1000)
        const curLocation = list.name
        const iconGif = MainInformationList[list.weather[0].main]
        const curMonth = new Intl.DateTimeFormat('en-En', { month: "short"}).format(date)
        const weekday = new Intl.DateTimeFormat('en-En', { weekday: 'long' }).format(date)
        const curDay = new Intl.DateTimeFormat('en-En', {day: '2-digit'}).format(date)
        const curYear = new Intl.DateTimeFormat('en-En', {year: 'numeric'}).format(date)
        const monthDisplay = curDay + "." + curMonth + "." + curYear




        return <div className={styles.mainInfo}>
        <div className={styles.dateString}>
            <div className={styles.location}>{curLocation}</div>
                <div className={styles.weekday}>{weekday}</div>
                <div className={styles.curDate}>{monthDisplay}</div>
        </div>
            <div className={styles.weatherAndImage}>
                <div className={styles.leftSide}>
                    <div className={styles.temp}>{temp}</div>
                    <div className={styles.weather}>{weather}</div>
                </div>
                <div className={styles.rightSide}>
                    <img className={styles.weatherGif} src={iconGif}></img>
                </div>
            </div>
        </div>
}

export default MainInformation