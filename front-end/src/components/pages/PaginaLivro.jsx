import Container from "../layouts/Container";
import styles from './PaginaLivro.module.css'
import Input from "../Input";
import Button from "../Button";
import { UserContext } from "../../App";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import {useContext} from "react";

export default function PaginaLivro() {
    
  
    const Navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [editora, setEditora] = useState("");
    const [autor, setAutor] = useState("");
    
    const { user, setUser } = useContext(UserContext);
    
    const addCarrinho = async (e) => {
        e.preventDefault();
        if (user !== null) {
          Navigate("/carrinho");
        } else {
          toast.error("Você precisa estar logado!!");
        }
      };
      
      const goToAtualiza = (e) => {
        e.preventDefault();
        if (user !== null && user.privilege === 'admin') {
          Navigate("/atualizarlivro/");
        } else {
          toast.error("Você não tem permissão para isso!");
        }
      };

    return (
    <Container customClass='backgroundStandart'>
        <section className={styles.atualiza}>
            <h2></h2>
            <form action="">
                <div className={styles.imgAtualiza}>
                    <img src="" alt="" />
                </div>
                <div className={styles.inputsLivro}>
                    <h3>{nome}Nome livro</h3>
                    <p>{preco}preço</p>
                    <br/>
                    <p>{editora}Editora</p>
                    <p>{autor}Autor</p>
                   
                   <div className={styles.submit}>
                        <Button text="Carrinho" customClass="marginless" onClick={addCarrinho} />
                        <Button text="Atualiza" customClass="marginless" onClick={goToAtualiza} />
                    </div>
                </div>
            </form>
        </section>
    </Container>
)
}