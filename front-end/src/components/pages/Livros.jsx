import Container from '../layouts/Container'
import styles from "./Livros.module.css"
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import axios from 'axios'
import { useEffect, useState } from 'react'

import Card from '../cards/Card'


export default function Livros() {
    const [books, setBooks] = useState([])
    const [visibleBooks, setVisibleBooks] = useState([])

    useEffect(() => {
        (async () => {
            const result = await axios.get("http://localhost:3000/book");
            const books = result.data.books;
            setBooks(books)
            setVisibleBooks(books);
        })();
    }, []);
    

    return( 
        <Container customClass='backgroundStandartG'>
            <h2></h2>
            <section className={styles.livros_busca}>
                <div className={styles.buscador}>
                    <Input name="Busca" type="text" placeholder="Buscar" customClass="inputBusca" onChange={onChange} />
                </div>
                <div className={styles.grid}>
                    {
                        visibleBooks.map((livro) => (<Card title={(livro.title)} author={livro.author} publisher={livro.publisher}
                            price={livro.price}
                            thumbnail={livro.thumbnail}
                            id={livro.id}
                        />))
                    }
                    {
                        
                    }
                </div>
               {/* <Card title={(livro.title)} author={livro.author} publisher={livro.publisher}
               price={livro.price}
               /> */}
                    
            </section>
        </Container>
    )
}