import styles from "./ButtonSubmit.module.css"
export default function ButtonSubmit({text, customClass, func}) {
    return (
        <button onClick={func} type="submit" className={`${styles.buttonSubmit} ${styles[customClass]}`}>
            {text}
        </button>
    )
}