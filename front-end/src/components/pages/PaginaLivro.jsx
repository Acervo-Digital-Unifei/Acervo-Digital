import Container from "../layouts/Container";
import styles from './AtualizarLivro.module.css'
import Input from "../Input";
import Button from "../Button";
import { UserContext } from "../../App";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

export default function PaginaLivro() {
    
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [editora, setEditora] = useState("");
    const [autor, setAutor] = useState("");
    
    const { user, setUser } = useContext(UserContext);

    const goToAtualiza = ()=>{
        if (user !== null && user.privilege === 'admin') {
            Navigate("/atualizalivro");
          } else {
            alert("Você não tem permissão para isso!");
          }
        }

    const addCarrinho =()=> { 
        if (user !== null) {
            Navigate("/carrinho");
          } else {
            alert("Voce deve estar logado para isso!");
            Navigate("/login");
          }

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