import { useEffect, useState } from "react";
import { getForecastOnWeek } from "../../handlers";
import Card from "../Card/Card"
import WeekEntry from "./WeekEntry";
import styles from "./WeekForecast.module.scss"


const WeekForecast = ({selectedCity}) => {
    const [list, setList] = useState([])

        useEffect(() => {
            if (!selectedCity) return
            async function fetchData() {
                const data = await getForecastOnWeek(selectedCity.lat, selectedCity.lon)
                console.log(data)

                const entries = data.daily.time.map((date, index) => ({
                    date: date,
                    code: data.daily.weathercode[index],
                    max: data.daily.temperature_2m_max[index],
                    min: data.daily.temperature_2m_min[index],
                })) 
                setList(entries)
            }
            fetchData()
        },[selectedCity])

        if (!selectedCity) return <div>Plug</div>

        return <div className={styles.weekForecast}>
            <Card direction="column" list={list} title="7-day forecast" entryComponent={WeekEntry} cardClassName={styles.card} contentClassName={styles.content}/>
            </div>
}

export default WeekForecast