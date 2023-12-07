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

  const { user, setUser } = useContext(UserContext);

  const addCarrinho = async (e) => {
    e.preventDefault();
    if (user !== null) {
      Navigate("/carrinho");
    } else {
      toast.error("Você precisa estar logado!!");
      Navigate('/login')
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
                    <p>Editora: {editora}</p>
                    <p>Autor: {autor}</p>
                </div>
                <p className={styles.price}>R${preco}</p>
            </div>

            <div className={styles.submit}>
              <Button text="Carrinho" customClass="marginless" onClick={addCarrinho} />
              <Button text="Atualiza" customClass="marginless" onClick={goToAtualiza} />
              <Button text="Deletar" customClass="marginless" onClick={deleteBook} />
            </div>
          </div>
        </form>
      </section>
    </Container>
  )
}