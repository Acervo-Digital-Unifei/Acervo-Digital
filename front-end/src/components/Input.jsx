import styles from './Input.module.css'

export default function Input({type, name, placeholder,customClass}){
    return (
        <div className={`${styles.input} ${styles[customClass]}`}>
            <input type={type} name={name} placeholder={placeholder} id={name}
            
            />
            
        </div>
    )
}