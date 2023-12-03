import styles from './TrocaSenha.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'

export default function TrocaSenha() {
    return (
        <Container customClass='background'>
          <section className={styles.trocaPassword}>
          <h2>TROCAR SENHA</h2>
          <form action=""> 
                    <Input name="Email" type="email" placeholder="email" />
                    <Input name="Nova Senha" type="password" placeholder="Nova Senha!"/>
                    <ButtonSubmit text="Atualizar"/>
                </form>
          </section>
        </Container>
    )
}