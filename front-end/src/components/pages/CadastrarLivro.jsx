import Container from "../layouts/Container";
import styles from './CadastrarLivro.module.css'
import Input from "../Input";
import Button from "../Button";
import axios from 'axios';
import ButtonSubmit from "../ButtonSubmit";

import { useRef, useState } from 'react'

export default function CadastrarLivro() {
    const [thumbnail, setThumbnail] = useState("");
    const [isbn, setIsbn] = useState("");
    //states 
    const[nome,setNome] = useState("");
    const[preco,setPreco] = useState("");
    const[editora,setEditora] = useState("");
    const[author,setAutor] = useState("");
    
    const handleNomeChange = (e) =>{
        setNome(e.target.value);
    };
    const handlePrecoChange = (e) =>{
        setPreco(e.target.value);
    };
    const handleEditoraChange = (e) =>{
        setEditora(e.target.value);
    };
    const handleAutorChange = (e) =>{
        setAutor(e.target.value);
    };


    const ref = useRef();

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    
    const handleThumbChange = async (e) => {
        if(e.target.files.length === 0) {
            return setThumbnail("");
        }
        
        setThumbnail(await toBase64(e.target.files[0]));
    }

    const handleButtonISBN = async (e) => {
        e.preventDefault();
        if(isbn === '') 
            return alert('Campo ISBN vazio!');
        try {
           
            const result = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`)
            console.log(result.data)

            
        } catch(e) {
            console.log(e)
        }

    }


    const buttonSubmit = async (e)=> {
      e.preventDefault();
        const dadosLivro = {
            "thumbnail": "...",
            "author":author,
            "publisher": editora,
            "title": nome,
            "price": preco
                   
        }
    
        
            const response = await axios.post("http://localhost:3000/book/add", dadosLivro);
            console.log('Resposta:', dadosLivro);
      
    }

    return (
    <Container customClass='backgroundStandart'>
        <section className={styles.atualiza}>
            <h2>CADASTRAR LIVROS</h2>
            <form action="">
                <div className={thumbnail === '' ? styles.imgAtualiza : styles.imgAtualiza2 } onClick={() => ref.current.click()}>
                    <img src={thumbnail}/>
                </div>
                <div className={styles.inputsLivro}>
                    <input ref={ref} type="file" hidden accept="image/*" onChange={handleThumbChange}/>
                    <Input type='text' name='autorChange' placeholder="Autor" 
                    customClass="backgroundStandart" onChange={handleAutorChange}/>
                    <Input type='text' name='editoraChange' placeholder="Editora" 
                    customClass="backgroundStandart"onChange={handleEditoraChange}/>
                    <Input type='text' name='nomeChange' placeholder="Nome do livro" 
                    customClass="backgroundStandart"onChange={handleNomeChange}/>
                    <Input type='number' name='precoChange' placeholder="Preço" 
                    customClass="backgroundStandart" onChange={handlePrecoChange}/>
                    <div className={styles.submit}>
                        <Input type='number' name='isbn' placeholder="ISBN"
                        customClass="backgroundStandartM" value={isbn} onChange={e => setIsbn(e.target.value)}/>
                        <Button text="Find" customClass="marginless" onClick={handleButtonISBN}/>
                    
                    </div>
                    <ButtonSubmit text="Cadastrar" func ={buttonSubmit} />
                </div>
            </form>
        </section>
    </Container>
)
}