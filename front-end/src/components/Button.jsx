import styles from "./Button.module.css"
export default function Button({text, customClass, onClick}) {
    return (
        <button onClick={onClick} className={`${styles.buttonSubmit} ${styles[customClass]}`}>
            {text}
        </button>
    )
}