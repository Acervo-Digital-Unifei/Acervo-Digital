import styles from "./ButtonSubmit.module.css"
export default function ButtonSubmit({text, customClass}) {
    return (
        <button type="submit" className={`${styles.buttonSubmit} ${styles[customClass]}`}>
            {text}
        </button>
    )
}