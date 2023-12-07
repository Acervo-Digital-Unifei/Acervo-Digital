import styles from "./Button.module.css"
import { MdShoppingCart } from "react-icons/md";
export default function Button({text, customClass, onClick, emote}) {
    return (
        <button onClick={onClick} className={`${styles.buttonSubmit} ${styles[customClass]}`}>
            {text}
            {emote && <MdShoppingCart className={styles.emoteStyle}/>}
        </button>
    )
}