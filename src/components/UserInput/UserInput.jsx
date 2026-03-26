import styles from "./UserInput.module.scss"


const UserInput = ({value, onChange }) => {

return (
    <input className={styles.userInput} type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Text"/>
)
}

export default UserInput