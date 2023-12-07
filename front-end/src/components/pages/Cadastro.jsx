import styles from './Cadastro.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import { useState } from 'react'
import axios from 'axios'
import * as Constants from '../../constants'
import { toast } from 'react-toastify';

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
        
        if(!name) return toast.error('Campo de nome não preenchido!');
        else if(!email) return toast.error('Campo de email não preenchido!');
        else if(!password) return toast.error('Campo de senha não preenchido!');
        else if(!passwordConfirm) return toast.error('Campo de confirmação de senha não preenchido!');

        if(password !== passwordConfirm)
            return toast.error('Senha e confirmação de senha não combinam!');

        if(password.length < 4)
            return toast.error('Senha deve ter pelo menos 4 caracteres');

        if(!checkName(name))
            return toast.error('Nome inválido. Seu nome só pode conter letras e espaços, e deve ter um tamanho máximo de 70 caracteres.')

        try {
            const result = await axios.post(Constants.USER_REGISTER_API_POST_URL, {
                username: name,
                password,
                email
            });

            if(result?.data?.status !== 'ok') return toast.error(`Erro: ${result.data.error}`);
            toast.success(`Email de confirmação de cadastro enviado para ${email}. Confira sua caixa de email. Caso não o encontre, confira a caixa de spam.`);
            clearFields();
        } catch(e) {
            const response = e?.response;
            
            if(response?.data?.error !== undefined) {
                if(response.data.error === 'Email already registered') toast.error(`Email "${email.toLocaleLowerCase()}" já cadastrado`);
                else if(response.data.error === 'Username already registered') toast.error(`Já existe alguém cadastrado com o nome "${name}"`);
                else toast.error(`Erro: ${response.data.error}`);
            }
            else toast.error(`Erro de conexão com o servidor`);
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