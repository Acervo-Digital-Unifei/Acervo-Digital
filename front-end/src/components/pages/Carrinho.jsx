import styles from './Carrinho.module.css'
import { Link } from 'react-router-dom'
import Container from '../layouts/Container'
export default function Carrinho() {
    return (
        <Container customClass='backgroundWhite'>
            <section className={styles.carrinho}>
                <h2>Seu carrinho de compras</h2>
                <p>Seu carrinho está vazio</p>
                <Link to="/livros"><button>Continuar Comprando</button></Link>
            </section>
        </Container>
    )
}