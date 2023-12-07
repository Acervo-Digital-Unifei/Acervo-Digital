import Container from '../layouts/Container'
import styles from "./Livros.module.css"
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import axios from 'axios'
import { useEffect, useState } from 'react'


export default function Livros() {



useEffect(() => {

    const getBook = async () => {
        const result = await axios.get("http://localhost:3000/book");
        const book = result.data.books;
        console.log(book[2].title);
    }
        getBook()}, []);
        

    return( 
        <Container customClass='backgroundStandart'>
            <section className={styles.livros_busca}>
                <div>
                    <Input name="Busca" type="text" placeholder="Buscar" customClass="inputBusca" />  
                </div>
                <div>
                    <h1 className={styles.testeh1}>O</h1>

                </div>
                    
            </section>
        </Container>
    )
}