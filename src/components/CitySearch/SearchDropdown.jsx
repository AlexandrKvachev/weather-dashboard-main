import styles from "./SearchDropdown.module.scss"

const SearchDropwdown = ({ cities, onSelect }) => {
    return (
        <ul className={styles.list}>
            {cities.map(city => (
                <li key={`${city.lat}-${city.lon}`} onClick={() => onSelect(city)}>{city.name}</li>
            ))}           
        </ul>
    )
}

export default SearchDropwdown