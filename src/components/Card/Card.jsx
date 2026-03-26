import { Children } from "react"
import styles from "./Card.module.scss"

const Card = (props) => {
    const EntryComponent = props.entryComponent
    return <div className={`${styles.card} ${props.cardClassName || ''}`}>
        <p className={styles.title}>{props.title}</p>
        <div className={`${styles.content} ${props.contentClassName || ''}`} style={{ flexDirection: props.direction}}>
            { props.list && props.list.map((entry) => {
                return <EntryComponent entry={entry} timeZoneOffSet={0}/>  
            })}
        </div>
    </div>
}

export default  Card