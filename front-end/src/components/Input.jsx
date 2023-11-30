import styles from './Input.module.css'

export default function Input({type, name, placeholder}){
    return (
        <div className={styles.input}>
            <input type={type} name={name} placeholder={placeholder} id={name}
            
            />
            
        </div>
    )
}