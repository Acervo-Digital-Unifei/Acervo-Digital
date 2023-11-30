import styles from './Login.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'

export default function Login() {
    return (
        <Container customClass="background">
            <section className={styles.login}>
                <h2>ENTRAR</h2>
                <form action="">
                    <Input name="email" type="email" placeholder="email@example.com" />
                    <Input name="senha" type="password" placeholder="Senha"/>
                    <ButtonSubmit text="ENTRAR"/>
                </form>
            </section>
        </Container>
    )
}