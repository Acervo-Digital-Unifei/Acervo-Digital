import Container from "../layouts/Container";
import styles from './AtualizarLivro.module.css'
import Input from "../Input";
import Button from "../Button";
import axios from 'axios';

import { useRef, useState } from 'react'

export default function AtualizarLivro() {
    const [thumbnail, setThumbnail] = useState("");
    const [isbn, gfdgdf] = useState("");
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
            console.log(result);
            console.log(result.data);
        } catch(e) {
            console.log(e)
        }

    }

    return (
    <Container customClass='backgroundStandart'>
        <section className={styles.atualiza}>
            <h2>ATUALIZAR LIVROS</h2>
            <form action="">
                <div className={thumbnail === '' ? styles.imgAtualiza : styles.imgAtualiza2 } onClick={() => ref.current.click()}>
                    <img src={thumbnail}/>
                </div>
                <div className={styles.inputsLivro}>
                    <input ref={ref} type="file" hidden accept="image/*" onChange={handleThumbChange}/>
                    <Input type='text' name='autorChange' placeholder="Autor" 
                    customClass="backgroundStandart"/>
                    <Input type='text' name='editoraChange' placeholder="Editora" 
                    customClass="backgroundStandart"/>
                    <Input type='text' name='nomeChange' placeholder="Nome do livro" 
                    customClass="backgroundStandart"/>
                    <Input type='number' name='precoChange' placeholder="Preço" 
                    customClass="backgroundStandart"/>
                    <div className={styles.submit}>
                        <Input type='number' name='isbn' placeholder="ISBN"
                        customClass="backgroundStandartM" value={isbn} onChange={e => gfdgdf(e.target.value)}/>
                        <Button text="Find" customClass="marginless" onClick={handleButtonISBN}/>
                    </div>
                </div>
            </form>
        </section>
    </Container>
)
}