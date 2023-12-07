import Container from "../layouts/Container";
import styles from './AtualizarLivro.module.css'
import Input from "../Input";
import Button from "../Button";
import { UserContext } from "../../App";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function PaginaLivro() {
    
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [editora, setEditora] = useState("");
    const [autor, setAutor] = useState("");
    
    const { user, setUser } = useContext(UserContext);
    
    const buttonAdicionar = ()=>{
        Navigate("/carrinho");
    }
    const buttonAtualizar = ()=>{
        if(user.privilege){
            Navigate("/atualizarlivro");}
        else{alert("Você não tem permissao pra isso!")};
        
    }
    return (
    <Container customClass='backgroundStandart'>
        <section className={styles.atualiza}>
            <h2></h2>
            <form action="">
                <div className={styles.imgAtualiza}>

                </div>
                <div className={styles.inputsLivro}>
                    <h3>{nome}Nome livro</h3>
                    <p>{preco}preço</p>
                    <br/>
                    <p>{editora}Editora</p>
                    <p>{autor}Autor</p>
                   
                   '' <div className={styles.submit}>
                        <Button text="Carrinho" customClass="marginless" onClick={addCarrinho} />
                        <Button text="Atualiza" customClass="marginless" onClick={goToAtualiza} />
                    </div>
                </div>
            </form>
        </section>
    </Container>
)
}