import { useEffect, useState } from "react"
import { getForecast } from "../../handlers"
import Card from "../Card/Card"
import WeatherEntry from "../WeatherEntry/WeatherEntry"
import styles from "./TodaysForecast.module.scss"


const TodaysForecast = ({selectedCity}) => {
    const [list, setList] = useState([])

        useEffect(() => {
            if (!selectedCity) return
            const fetchData = async () => {
            const forecastRes = await getForecast(selectedCity.lat, selectedCity.lon)
            setList(forecastRes.list.slice(0, 4))
            console.log(forecastRes)
            }
            fetchData()
        },[selectedCity])

        if (!selectedCity) return <div>Plug</div>

        return <Card direction="row" list={list} title="Today's forecast" entryComponent={WeatherEntry} cardClassName={styles.todaysCard}/>
        }

    export default TodaysForecast