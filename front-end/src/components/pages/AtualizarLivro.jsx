import Container from "../layouts/Container";
import styles from './AtualizarLivro.module.css'
import Input from "../Input";
import ButtonSubmit from "../ButtonSubmit";
export default function AtualizarLivro() {
    return (
    <Container customClass='backgroundStandart'>
        <section className={styles.atualiza}>
            <h2>ATUALIZAR LIVROS</h2>
            <form action="">
                <div className={styles.imgAtualiza}>

                </div>
                <div className={styles.inputsLivro}>
                    <Input type='text' name='autorChange' placeholder="Autor" 
                    customClass="backgroundStandart"/>
                    <Input type='text' name='editoraChange' placeholder="Editora" 
                    customClass="backgroundStandart"/>
                    <Input type='text' name='nomeChange' placeholder="Nome do livro" 
                    customClass="backgroundStandart"/>
                    <Input type='number' name='precoChange' placeholder="Preço" 
                    customClass="backgroundStandart"/>
                    <div className={styles.submit}>
                        <Input type='number' name='isbm' placeholder="ISBM"
                        customClass="backgroundStandartM" />
                        <ButtonSubmit text="Find" customClass="marginless"/>
                    </div>
                </div>
            </form>
        </section>
    </Container>
)
}