import styles from './Cadastro.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import { useState } from 'react'
import axios from 'axios'
import * as Constants from '../../constants'

export default function Cadastro() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const checkName = (name) => {
        return (typeof(name === 'string' && name.length <= 70)) && String(name)
            .toLowerCase()
            .match(/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g);
    };

    const clearFields = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // TODO: Alterar todos os alerts para algo melhor
        // Possíveis opções:
        // https://www.npmjs.com/package/react-custom-alert
        // https://mui.com/material-ui/react-alert/
        // https://blog.logrocket.com/create-custom-react-alert-message/
        // ou qualquer coisa nesse sentido

        if(!name) return alert('Campo de nome não preenchido!');
        else if(!email) return alert('Campo de email não preenchido!');
        else if(!password) return alert('Campo de senha não preenchido!');
        else if(!passwordConfirm) return alert('Campo de confirmação de senha não preenchido!');

        if(password !== passwordConfirm)
            return alert('Senha e confirmação de senha não combinam!');

        if(!checkName(name))
            return alert('Nome inválido. Seu nome só pode conter letras e espaços, e deve ter um tamanho máximo de 70 caracteres.')

        try {
            const result = await axios.post(Constants.USER_REGISTER_API_POST_URL, {
                username: name,
                password,
                email
            });

            if(result?.data?.status !== 'ok') return alert(`Erro: ${result.data.error}`);
            alert(`Email de confirmação de cadastro enviado para ${email}. Confira sua caixa de email. Caso não o encontre, confira a caixa de spam.`);
            clearFields();
        } catch(e) {
            const response = e?.response;
            console.log(e)
            if(response?.data?.error !== undefined) {
                if(response.data.error === 'Email already registered') alert(`Email "${email.toLocaleLowerCase()}" já cadastrado`);
                else if(response.data.error === 'Username already registered') alert(`Já existe alguém cadastrado com o nome "${name}"`);
                else alert(`Erro: ${response.data.error}`);
            }
            else alert(`Erro de conexão com o servidor`);
        }
    }

    return (
        <Container customClass="background">
            <section className={styles.cadastro}>
                <h2>CRIE SUA CONTA</h2>
                <form onSubmit={handleSubmit}>
                    <Input label="Nome" name="name" type="text" placeholder="Digite o seu nome" value={name} onChange={(e) => setName(e.target.value)}/>
                    <Input label="Endereço de Email" name="email" type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <Input label="Senha" name="senha" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Input label="Confirmação de Senha" name="confirmaSenha" type="password" placeholder="Confirma Senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
                    <ButtonSubmit text="CADASTRAR"/>
                </form>
            </section>
        </Container>
    )
}