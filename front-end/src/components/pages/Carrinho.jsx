import styles from './Carrinho.module.css'
import { Link } from 'react-router-dom'
import { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Constants from '../../constants';
import Button from '../Button'

import { UserContext } from '../../App'
import Container from '../layouts/Container'
import CarrinhoItem from '../CarrinhoItem';
import { toast } from 'react-toastify';

export default function Carrinho() {
    const [items, setItems] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const initialized = useRef(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        if (user === null) {
            toast.error('Você precisa estar logado!');
            navigate('/login');
            return;
        }
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const carr = JSON.parse(localStorage.getItem('carrinho'));
                const futureItems = [];
                for (const [id, quantidade] of Object.entries(carr)) {
                    try {
                        const response = await axios.get(`${Constants.BOOK_GET_BOOK_BY_ID_API_GET_URL}?id=${id}`);
                        const book = response.data.book;

                        futureItems.push({
                            nome: book.title,
                            preco: book.price,
                            qtd: quantidade
                        });
                    } catch { }
                }
                setItems(futureItems);
            } catch (e) {
                setItems([]);
            }
        })();
    }, []);

    const confirmarCompra = async (e) => {
        e.preventDefault();
        if(items.length === 0) {
            toast.error('Você não tem nada no carrinho!');
            return;
        }

        try {
            const carr = JSON.parse(localStorage.getItem('carrinho'));
            await axios.post(`${Constants.PURCHASE_CONFIRM_API_POST_URL}`, {
                items: carr
            });
            toast.success('Compra efetuada com sucesso! Confira seu email para a descrição da compra.');
            localStorage.removeItem('carrinho');
            setItems([]);
        } catch {
            toast.error('Erro de conexão com o servidor!');
        }
    }


    return (
        <Container customClass='backgroundWhite'>
            <section className={styles.carrinho}>
                <h2>Seu carrinho de compras</h2>

                {
                    <section className={styles.sectionCarr}>
                        <div className={styles.cabecalhoCarr}>
                            <p>Nome</p>
                            <div className={styles.unity}>
                                <p>Preço</p>
                                <p>QTD</p>
                            </div>
                        </div>

                        {
                            items.map((item) =>
                                <CarrinhoItem nome={(item.nome)} preco={item.preco} qtd={item.qtd} key={item.nome} />
                            )

                        }
                        
                    </section>
                }

                <div className={styles.botaoCarrinho}>
                    <Link to="/livros"><button>Continuar Comprando</button></Link>
                    <button onClick={confirmarCompra}> Confirmar Compra</button>
                </div>
            </section>
        </Container>
    )
}