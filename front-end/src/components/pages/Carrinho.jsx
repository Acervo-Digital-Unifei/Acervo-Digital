import styles from './Carrinho.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';

import Container from '../layouts/Container'
import CarrinhoItem from '../CarrinhoItem';

export default function Carrinho() {
    const [carr, setCarr] = useState(null)
        
    useEffect(() => {
        (async () => {
            try {
                const carr = JSON.parse(localStorage.getItem('carrinho'));
                setCarr(carr)
                console.log(carr)
            }catch {
                console.log('ERRO')
            }
        })();
    }, []);
    return (
        <Container customClass='backgroundWhite'>
            <section className={styles.carrinho}>
                <h2>Seu carrinho de compras</h2>
               

                {
                    //carr != null && 
                    <section className={styles.sectionCarr}>
                        <div className={styles.cabecalhoCarr}>
                            <p>Nome</p>
                            <div className={styles.unity}>
                                <p>Preço</p>
                                <p>QTD</p>
                            </div>
                        </div>
                        <CarrinhoItem/>
                    {
                        carr != null && carr.map((item) => {
                            <CarrinhoItem nome={item.nome} preco={item.preco} qtd={item.qtd}/>
                        })
                    }
                        <div className={styles.priceCarr}>
                            <p>Total</p>
                            <p>Preço Total</p> {/*substituir {}*/}
                        </div>
                    </section>
                }
                
                <Link to="/livros"><button>Continuar Comprando</button></Link>
            </section>
        </Container>
    )
}