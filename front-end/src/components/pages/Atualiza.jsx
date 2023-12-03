import styles from './Atualiza.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'

export default function Atualiza() {
    return (
        <Container customClass='background'>
          <section className={styles.atualiza}>
          <h2>ATUALIZA EMAIL</h2>
          <form action="" > 
                    <Input name="Email antigo" type="email" placeholder="Email antigo" />
                    <Input name="email" type="email" placeholder="Novo email"/>
                    <ButtonSubmit text="Atualizar"/>
                </form>
          </section>
        </Container>
    )
}