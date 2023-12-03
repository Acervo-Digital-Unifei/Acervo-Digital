import styles from './Cadastro.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'

export default function Cadastro() {
    return (
        <Container customClass="background">
            <section className={styles.cadastro}>
                <h2>CRIE SUA CONTA</h2>
                <form action="">
                    <Input name="name" type="text" placeholder="Digite o seu nome"/>
                    <Input name="email" type="email" placeholder="email@example.com" />
                    <Input name="senha" type="password" placeholder="Senha"/>
                    <Input name="confirmaSenha" type="password" placeholder="Confirma Senha"/>
                    <ButtonSubmit text="CRIAR CONTA"/>
                </form>
            </section>
        </Container>
    )
}