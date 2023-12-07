import styles from './Card.module.css'
import {Link} from 'react-router-dom'
export default function Card({title, author, publisher, price, thumbnail, id}) {
    return (
        <section className={styles.card}>
            <Link to={`/paginalivro/${id}`}>
                <div className={styles.img}>
                    <img src={thumbnail} alt="" />
                </div>
            </Link>
            <section className={styles.cardFooter}>
                <h3>{title}</h3>
                <div className={styles.cardInfo}>
                    <div className={styles.cardEdit}>
                        <p>{author}</p>
                        <p>{publisher}</p>
                    </div>
                    <p>R${price}</p>
                </div>
                <button><Link to={`/paginalivro/${id}`}>Comprar</Link></button>
            </section>
        </section>
    )
}