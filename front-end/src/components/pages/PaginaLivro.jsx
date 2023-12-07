import Container from "../layouts/Container";
import styles from './PaginaLivro.module.css'
import Input from "../Input";
import Button from "../Button";
import { UserContext } from "../../App";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from "react";
import * as Constants from '../../constants';

export default function PaginaLivro() {
  const Navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [editora, setEditora] = useState("");
  const [autor, setAutor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [quantidade, setQuantidade] = useState(0);

  const { user, setUser } = useContext(UserContext);

  const removerCarrinho = async (e) => {
    e.preventDefault();
    if (user === null) {
      toast.error("Você precisa estar logado!!");
      Navigate('/login')
      return;
    }

    try {
      const carrinho = JSON.parse(localStorage.getItem('carrinho'));
      if (carrinho[params.id] === undefined || carrinho[params.id] === 0) {
        toast.error('Você já não tem nenhum deste item no carrinho');
        return;
      }

      carrinho[params.id] = 0;
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      setQuantidade(0);
      toast.success(`Item removido do carrinho.`);
    } catch {
      toast.error('Você já não tem nenhum deste item no carrinho');
      return;
    }

  }

  const updateCarrinho = async (e) => {
    e.preventDefault();
    if (user === null) {
      toast.error("Você precisa estar logado!!");
      Navigate('/login')
      return;
    }

    if (quantidade === 0) {
      toast.error("Você não pode adicionar zero livros no carrinho!!");
      return;
    }

    try {
      const carrinho = JSON.parse(localStorage.getItem('carrinho'));
      if (carrinho[params.id] !== undefined) {
        carrinho[params.id] += Number(quantidade);
        console.log(typeof (carrinho[params.id]))
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        toast.success(`Adicionado ${quantidade} livro(s) no carrinho.`);
        return;
      }

      carrinho[params.id] = Number(quantidade);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      toast.success(`Adicionado ${quantidade} livro(s) no carrinho.`);
    } catch {
      const carrinho = {};
      carrinho[params.id] = Number(quantidade);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      toast.success(`Adicionado ${quantidade} livro(s) no carrinho`);
    }
  };

  const goToAtualiza = (e) => {
    e.preventDefault();
    if (user !== null && user.privilege === 'admin') {
      Navigate(`/atualizarlivro/${params.id}`);
    } else {
      toast.error("Você não tem permissão para isso!");
    }
  };

  const deleteBook = async (e) => {
    e.preventDefault();
    if (user !== null && user.privilege === 'admin') {
      try {
        await axios.delete(`${Constants.BOOK_DELETE_API_DELETE_URL}?id=${params.id}`);
        toast.success('Livro deletado com sucesso!');
        Navigate('/livros');
      } catch (e) {
        const response = e.response;
        if (response?.status === 403)
          return toast.error('Erro de autenticação. Tente logar novamente!');
        if (response?.status === 400 || response?.status === 404)
          return toast.error('Erro ao tentar deletar livro do banco de dados!');
        if (!response)
          return toast.error('Erro de conexão!');
      }
    } else {
      toast.error("Você não tem permissão para isso!");
    }
  };

  const params = useParams();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const id = params.id;
    if (!id) {
      toast.error('Livro não encontrado');
      Navigate('/livros');
      return;
    }

    try {
      const carrinho = JSON.parse(localStorage.getItem('carrinho'));
      if (carrinho[params.id] !== undefined) {
        setQuantidade(Number(carrinho[params.id]));
      }
    } catch {}

    (async () => {
      try {
        const result = await axios.get(`${Constants.BOOK_GET_BOOK_BY_ID_API_GET_URL}?id=${id}`);
        console.log(result)
        const book = result.data.book;
        setNome(book.title);
        setEditora(book.publisher);
        setAutor(book.author);
        setPreco(book.price);
        setThumbnail(book.thumbnail);
      } catch (e) {
        const result = e.response;
        if (result?.status === 400 || result?.status === 404) {
          toast.error('Livro não encontrado');
        } else if (result.status === 422) {
          toast.error('Faltando parametro ID');
        } else {
          toast.error('Erro de conexão');
        }
        Navigate('/livros');
        return;
      }
    })();
  }, []);

  return (
    <Container customClass='backgroundStandart'>
      <section className={styles.atualiza}>
        
        <form action="">
          <div className={styles.imgAtualiza}>
            <img src={thumbnail} />
          </div>
          <div className={styles.inputsLivro}>
            <h3>{nome}</h3>
            <div className={styles.editInfos}>
                <div className={styles.edit}>
                    <p><span>Editora:</span> {editora}</p>
                    <p><span>Autor:</span> {autor}</p>
                </div>
                <p className={styles.price}>R${preco}</p>
            </div>

            <div className={styles.submit}>
              <Button text="Atualiza" customClass="marginless" onClick={goToAtualiza} />
              <Button text="Deletar" customClass="marginless" onClick={deleteBook} />
            </div>
            <div className={styles.submit}>
              <select name="quantity-select" defaultValue={"0"} value={quantidade} onChange={e => setQuantidade(e.target.value)}>
                <option value="0">Selecionar</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => <option value={x}>{x}</option>)}

              </select>

              <Button text="Alterar Quantidade do Carrinho" customClass="marginless" onClick={updateCarrinho} />
              <Button text="Remover do Carrinho" customClass="marginless" onClick={removerCarrinho} />
            </div>
          </div>
        </form>
      </section>
    </Container>
  )
}