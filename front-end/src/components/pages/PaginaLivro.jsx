import Container from "../layouts/Container";
import * as styles from './PaginaLivro.module.css';
import Button from "../Button";
import { useContext } from "react";
import { UserContext } from "../../App";

import { useRef, useState } from 'react'
import { Navigate } from "react-router-dom";

export default function PaginaLivro() {
    //states 
    const [bookTitle, setBookTitle] = useState("O homem e seus símbolos");
    const [author, setAuthor] = useState("Carl G. Jung");
    const [publisher, setPublisher] = useState("HarperCollins Brasil");
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
        
        
    </Container>
)
}