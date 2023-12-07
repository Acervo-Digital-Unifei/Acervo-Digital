import Container from '../layouts/Container'
import styles from "./CompraFinalizada.module.css"



export default function CompraFinalizada() {
    return( 
        <Container customClass='backgroundStandart'>
            <section className={styles.compraClass}>
                <h2>Compra finalizada!!!</h2>
                <p>Cheque seu email!!</p>
            </section>
        </Container>
    )
}