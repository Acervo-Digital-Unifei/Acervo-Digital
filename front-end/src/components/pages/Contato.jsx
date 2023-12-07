import Container from '../layouts/Container'
import styles from "./Contato.module.css"
import Input from '../Input'


export default function Contato() {
    return( 
        <Container customClass='backgroundStandart'>
            <section className={styles.contatoclass}>
                <h2>Quer levar a Acervo Digital para sua escola?</h2>
                <p>Entre em contato com a gente para solicitar livros para sua escola pelo email:
</p>
                <p>livrariaacervodigital@gmail.com</p>
            </section>
        </Container>
    )
}