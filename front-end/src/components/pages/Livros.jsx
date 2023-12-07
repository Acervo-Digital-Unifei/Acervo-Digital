import Container from '../layouts/Container'
import styles from "./Livros.module.css"
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'

export default function Livros() {
    return( 
        <Container customClass='backgroundStandart'>
            <section className={styles.livros_busca}>
                <div>
                    <Input name="Busca" type="text" placeholder="Buscar" customClass="inputBusca" />  
                </div>
                <div>
                    <h1 className={styles.testeh1}>O</h1>
                </div>
                    
            </section>
        </Container>
    )
}