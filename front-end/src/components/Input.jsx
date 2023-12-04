import styles from './Input.module.css'

export default function Input({type, name, placeholder,customClass, value, onChange, label}){
    return (
        <div className={`${styles.input} ${styles[customClass]}`}>
            { label !== undefined && <label>{label}</label>}
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                id={name} 
                value={value}
                onChange={onChange}
            />
        </div>
    )
}