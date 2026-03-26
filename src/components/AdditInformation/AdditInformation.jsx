import { useEffect,useState } from "react";
import { getWeather } from "../../handlers";
import thermometerIcon from "../../assets/thermometer.png";
import windIcon from "../../assets/wind.png"
import minMaxIcon from "../../assets/minMax.png"
import Card from "../Card/Card";
import styles from "./AdditInformation.module.scss"

const AdditInformation = ({selectedCity}) => {
    const [list, setList] = useState(null)

        useEffect(() => {
            if (!selectedCity) return
            const fetchData = async () => {
                const res = await getWeather(selectedCity.lat, selectedCity.lon)
                setList(res)
                console.log(res)
            }
            fetchData()
        },[selectedCity])

        if (!selectedCity) return <div>Plug</div>
        if (!list) return <div>Plug</div>

        const wind = Math.round(list.wind.speed * 3.6)
        const feelsLike = Math.round(list.main.feels_like)
        const minTemp = Math.round(list.main.temp_min)
        const maxTemp = Math.round(list.main.temp_max)

        const items = [
            {icon: windIcon, label: 'Wind', value: `${wind} km/h`},
            {icon: thermometerIcon, label: 'Feels like', value: `${feelsLike} °`},
            {icon: minMaxIcon, label: 'High/Low', value: `${maxTemp} / ${minTemp}`}
        ]

        const InfoEntry = ({ entry }) => (
            <div className={styles.infoToday}>
                <img className={styles.statusIcon} src={entry.icon} alt={entry.label}/>
                 <div className={styles.infoName}>{entry.label}</div>
                <div className={styles.infoValue}>{entry.value}</div>
            </div> 
        )

        return (
            <Card
                direction="row"
                list={items}
                entryComponent={InfoEntry}
                cardClassName={styles.info}
            />
        )
}

export default AdditInformation