import { useState } from "react";
import Card from "./components/Card/Card"
import CitySearch from "./components/CitySearch/CitySearch";
import TodaysForecast from "./components/TodaysForecast/todaysForecast";
import WeekForecast from "./components/WeekForecast/WeekForecast";
import MainInformation from "./components/MainInformation/MainInformation";
import AdditInformation from "./components/AdditInformation/AdditInformation";
import styles from "./App.module.scss"

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null)
    return <div className={styles.wrapper}>
      <div className={styles.mainCard}>
        <CitySearch onCitySelect={setSelectedCity}/>
        <MainInformation selectedCity={selectedCity}/>
        <TodaysForecast selectedCity={selectedCity}/>
        <AdditInformation selectedCity={selectedCity}/>
      </div>
        <WeekForecast selectedCity={selectedCity}/>
    </div>;
}

export default App;