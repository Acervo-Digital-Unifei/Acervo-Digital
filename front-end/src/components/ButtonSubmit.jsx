import styles from "./ButtonSubmit.module.css"
export default function ButtonSubmit({text}) {
    return (
        <button type="submit" className={styles.buttonSubmit}>
            {text}
        </button>
    )
}