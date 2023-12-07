import Container from "../layouts/Container";
import styles from './CadastrarLivro.module.css'
import Input from "../Input";
import Button from "../Button";
import axios from 'axios';
import ButtonSubmit from "../ButtonSubmit";
import { UserContext } from '../../App'
import { useRef, useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import * as Constants from '../../constants';
import { toast } from 'react-toastify';

export default function CadastrarLivro() {
    const [thumbnail, setThumbnail] = useState("");
    const [isbn, setIsbn] = useState("");
    //states 
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [editora, setEditora] = useState("");
    const [autor, setAutor] = useState("");

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const ref = useRef();
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        if(user === null || user.privilege !== 'admin') {
            toast.error('Você precisa ser admin para acessar esta página!');
            navigate('/');
        }
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
            
            const nonExistentFields = [];
            if(Array.isArray(details.authors)) {
                setAutor(details.authors.map(x => x.name).join(', '));
            } else nonExistentFields.push('autor');
            if(Array.isArray(details.publishers)) {
                setEditora(details.publishers.join(', '));
            } else nonExistentFields.push('editora');
            if(details.title !== undefined) {
                setNome(details.title);
            } else nonExistentFields.push('nome');
            
            if(nonExistentFields.length !== 0)
                toast.warn(`Campo(s) de: ${nonExistentFields.join(', ')} inexistente(s) na database openlibrary.org`)
            
            try {
                toast.info('Baixando capa do livro...');
                const largetThumbnailUrl = `${thumbnail_url.split('-S.')[0]}-L.jpg`;
                setThumbnail(await toBase64FromUrl(largetThumbnailUrl));
                toast.success('Capa baixada com sucesso!');
            } catch {
                setThumbnail("");
                toast.warn('Capa não disponível na database openlibrary.org');
            }
            
        } catch {
            toast.warn('Erro de conexão com a database openlibrary.org');
        }
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

        if(Number.isNaN(preco) || Number(preco) <= 0)
            return toast.error('Preço inválido!');

        if(!thumbnail)
            return toast.error('Capa do livro não adicionada!');

        const dadosLivro = {
            "thumbnail": thumbnail,
            "author": autor,
            "publisher": editora,
            "title": nome,
            "price": Number(preco)
        }

        try {
            const result = await axios.post(Constants.BOOK_ADD_API_POST_URL, dadosLivro);
            const id = result.data.id;
            toast.success('Livro cadastrado com sucesso!');
            navigate(`/paginalivro/${id}`);
        } catch(e) {
            const result = e.response;

            if(result.status === 400) 
                return toast.error('Erro ao cadastrar livro!');
            if(result.status === 422)
                return toast.error(`Erro: ${result.data.error}`);
            if(result.status === 403)
                return toast.error(`Erro de autenticação, tente logar novamente!`);
        }
    }

    return (
        <Container customClass='backgroundStandart'>
            <section className={styles.atualiza}>
                <h2>CADASTRAR LIVRO</h2>
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
                            <Button text="Buscar" customClass="marginless" onClick={handleButtonISBN} />

                        </div>
                        <ButtonSubmit text="Cadastrar" func={buttonSubmit} />
                    </div>
                </form>
            </section>
        </Container>
    )
}