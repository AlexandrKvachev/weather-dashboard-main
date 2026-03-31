import { useState, useEffect } from "react";
import { getCities } from "../../handlers";
import UserInput from "../UserInput/UserInput";
import SearchDropdown from "./SearchDropdown.jsx"

const CitySearch = ({ onCitySelect }) => {
    const [inputValue, setInputValue] = useState('')
    const [cities, setCities] = useState([])
    useEffect(() => {
        const init = async () => {
            const choosenCity = localStorage.getItem('city')
            const defoultCity = choosenCity || 'Moscow'
            const cities = await getCities(defoultCity)
            if (cities.length > 0) {
                onCitySelect(cities[0])
            }
        }
        init()
    }, [])

    useEffect(() => {
        if (!inputValue) {
            setCities([])
            return
        }
        const timer = setTimeout(async () => {
            const res = await getCities(inputValue)
            setCities(res)
        }, 300)
        return () => clearTimeout(timer)
    }, [inputValue])

    const isSelect = (city) => {
        localStorage.setItem('city', city.name)
        setInputValue('')
        setCities([])
        onCitySelect(city)
    }

    return (
        <div>
            <UserInput value={inputValue} onChange={setInputValue}/>
            <SearchDropdown cities={cities} onSelect={isSelect}/>
        </div>
    )
}

export default CitySearch