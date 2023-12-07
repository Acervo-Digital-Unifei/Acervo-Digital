import styles from './Card.module.css'
import {Link} from 'react-router-dom'
export default function Card({title, author, publisher, price, thumbnail}) {
    return (
        <section className={styles.card}>
            <div className={styles.img}>
                <img src={thumbnail} alt="" />
            </div>
            <section className={styles.cardFooter}>
                <h3>{title}</h3>
                <div className={styles.cardInfo}>
                    <div className={styles.cardEdit}>
                        <p>{author}</p>
                        <p>{publisher}</p>
                    </div>
                    <p>R${price}</p>
                </div>
                <button><Link to=''>comprar</Link></button>
            </section>
        </section>
    )
}