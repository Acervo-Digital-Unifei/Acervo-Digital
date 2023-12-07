import Container from "../layouts/Container";
import styles from './AtualizarLivro.module.css'
import Input from "../Input";
import Button from "../Button";
import axios from 'axios';
import ButtonSubmit from "../ButtonSubmit";
import * as Constants from '../../constants';
import { UserContext } from '../../App'
import { useRef, useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

export default function AtualizarLivro() {
    const [thumbnail, setThumbnail] = useState("");
    const [isbn, setIsbn] = useState("");
    //states 
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [editora, setEditora] = useState("");
    const [autor, setAutor] = useState("");

    const { user, setUser } = useContext(UserContext);

    const params = useParams();
    const [id, setId] = useState("");

    const navigate = useNavigate();
    const ref = useRef();
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        if(user === null || user.privilege !== 'admin') {
            toast.error('Você precisa ser admin para acessar esta página!');
            navigate('/');
            return;
        }
        
        const id = params.id;
        if(!id) {
            toast.error('Id do livro inválido!');
            navigate('/');
            return;
        }

        setId(id);

        (async () => {
            try {
                const result = await axios.get(`${Constants.BOOK_GET_BOOK_BY_ID_API_GET_URL}?id=${id}`);
                const book = result.data.book;
                setNome(book.title);
                setAutor(book.author);
                setEditora(book.publisher);
                setPreco(''+book.price);
                setThumbnail(book.thumbnail);
            } catch(e) {
                if(e.response?.status === 404 || e.response?.status === 400) toast.error('Livro não encontrado!');
                else if(e.response?.status === 403) toast.error(`Erro de autenticação. Tente logar novamente!`);
                else if(e.response?.status) toast.error(`Erro: ${e.response.data.error}`);
                else if(!e.response) toast.error('Erro de conexão');
                navigate('/');
            }
        })();
    }, []);

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };
    const handlePrecoChange = (e) => {
        setPreco(e.target.value);
    };
    const handleEditoraChange = (e) => {
        setEditora(e.target.value);
    };
    const handleAutorChange = (e) => {
        setAutor(e.target.value);
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const toBase64FromUrl = async imageUrl => {
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                resolve(reader.result);
            }, false);

            reader.onerror = () => {
                return reject(this);
            };
            reader.readAsDataURL(blob);
        })
    }

    const handleThumbChange = async (e) => {
        if (e.target.files.length === 0) {
            return setThumbnail("");
        }

        setThumbnail(await toBase64(e.target.files[0]));
    }

    const handleButtonISBN = async (e) => {
        e.preventDefault();
        if (isbn === '')
            return toast.error('Campo ISBN vazio!');

        try {
            const result = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`)
            if (Object.entries(result.data).length === 0)
                return toast.warning('ISBN não encontrado na database openlibrary.org');
            
            const { details, thumbnail_url } = result.data[`ISBN:${isbn}`];
            console.log(result.data)
            setAutor(details.authors.map(x => x.name).join(', '));
            setEditora(details.publishers.join(', '));
            setNome(details.title);
            try {
                const largetThumbnailUrl = `${thumbnail_url.split('-S.')[0]}-L.jpg`;
                setThumbnail(await toBase64FromUrl(largetThumbnailUrl));
            } catch {
                setThumbnail("");
            }
        } catch {}
    }


    const buttonSubmit = async (e) => {
        e.preventDefault();

        if(!autor)
            return toast.error('Campo de autor não preenchido!');

        if(!editora)
            return toast.error('Campo de editora não preenchido!');

        if(!nome)
            return toast.error('Campo de nome do livro não preenchido!');
    
        if(!preco)
            return toast.error('Campo de preço não preenchido!');

        if(Number.isNaN(preco) || Number(preco) < 0)
            return toast.error('Preço inválido!');

        if(!thumbnail)
            return toast.error('Capa do livro não adicionada!');

        const dadosLivro = {
            "id": id,
            "thumbnail": thumbnail,
            "author": autor,
            "publisher": editora,
            "title": nome,
            "price": Number(preco)
        }

        try {
            await axios.post(Constants.BOOK_UPDATE_API_POST_URL, dadosLivro);
            toast.success('Livro atualizado com sucesso!');
            navigate(`/paginalivro/${id}`);
        } catch(e) {
            const result = e.response;

            if(!result)
                return toast.error('Erro de conexão com o servidor!');
            if(result.status === 400) 
                return toast.error('Erro ao atualizar livro!');
            if(result.status === 422)
                return toast.error(`Erro: ${result.data.error}`);
            if(result.status === 403)
                return toast.error(`Erro de autenticação, tente logar novamente!`);
        }
    }

    return (
        <Container customClass='backgroundStandart'>
            <section className={styles.atualiza}>
                <h2>ATUALIZAR LIVROS</h2>
                <form action="">
                    <div className={thumbnail === '' ? styles.imgAtualiza : styles.imgAtualiza2} onClick={() => ref.current.click()}>
                        <img src={thumbnail} />
                    </div>
                    <div className={styles.inputsLivro}>
                        <input ref={ref} type="file" hidden accept="image/*" onChange={handleThumbChange} />
                        <Input type='text' name='autorChange' placeholder="Autor"
                            customClass="backgroundStandart" value={autor} onChange={handleAutorChange} />
                        <Input type='text' name='editoraChange' placeholder="Editora"
                            customClass="backgroundStandart" value={editora} onChange={handleEditoraChange} />
                        <Input type='text' name='nomeChange' placeholder="Nome do livro"
                            customClass="backgroundStandart" value={nome} onChange={handleNomeChange} />
                        <Input type='number' name='precoChange' placeholder="Preço (em reais)"
                            customClass="backgroundStandart" value={preco} onChange={handlePrecoChange} />
                        <div className={styles.submit}>
                            <Input type='number' name='isbn' placeholder="ISBN"
                                customClass="backgroundStandartM" value={isbn} onChange={e => setIsbn(e.target.value)} />
                            <Button text="Find" customClass="marginless" onClick={handleButtonISBN} />

                        </div>
                        <ButtonSubmit text="Atualizar" func={buttonSubmit} />
                    </div>
                </form>
            </section>
        </Container>
    )
}