import Container from '../layouts/Container'
import styles from "./Profile.module.css"



export default function Profile() {
    return( 
        <Container customClass='backgroundStandart'>
            <section className={styles.profileclass}>
                <h2>Deseja alterar algum dado?</h2>
                <Link to ="/requisicaoalteraremail" >Alterar email!!</Link>
                <Link to ="/requisicaoalterarsenha" >Alterar senha!!</Link>
            </section>
        </Container>
    )
}