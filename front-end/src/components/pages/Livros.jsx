import Container from '../layouts/Container'
import styles from "./Livros.module.css"
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import axios from 'axios'
import { useEffect, useState } from 'react'

import Card  from '../cards/Card'


export default function Livros() {
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('');
    const [found, setFound] = useState(false);

    const getBooks = async () => {
        const result = await axios.get("http://localhost:3000/book");
        const books = result.data.books;
        console.log(books[2].title);
        setBooks(books)

    };

useEffect(() => {

        getBooks()
        
    }, []);
    
   
    return( 
        <Container customClass='backgroundStandartG'>
            <h2></h2>
            <section className={styles.livros_busca}>
                <div className={styles.buscador}>
                    <Input name="Busca" type="text" placeholder="Buscar" customClass="inputBusca"/>  
                </div>
                <div className={styles.grid}>
                    {
                        
                        books.map((livro) => (<Card title={(livro.title)} author={livro.author} publisher={livro.publisher}
                        price={livro.price}
                        thumbnail={livro.thumbnail}
                        />))
                    }
                    {
                        
                    }
                </div>
               
                    
            </section>
        </Container>
    )
}