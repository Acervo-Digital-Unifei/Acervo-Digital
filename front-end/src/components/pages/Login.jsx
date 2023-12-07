import styles from './Login.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import * as Constants from '../../constants'
import { UserContext } from '../../App'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify';

export default function Login() {
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const clearFields = () => {
        setEmail("");
        setPassword("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email) return toast.error('Campo de endereço de email não preenchido!');
        if(!password) return toast.error('Campo de senha não preenchido!');

        try {
            const result = await axios.post(Constants.USER_LOGIN_API_POST_URL, {
                email,
                password
            });

            if(result?.data?.status !== 'ok') return toast.error(`Erro: ${result.data.error}`);

            const token = result.headers['authorization'];
            if(!token) return toast.error('Erro ao extrair token no front-end');

            sessionStorage.setItem('token', token);
            const content = jwtDecode(token.split(' ')[1]);
            toast.success('Logado com sucesso!');
            clearFields();

            setUser({
                username: content.username,
                email: content.email,
                privilege: content.privilege
            });
            navigate('/');
            
        } catch(e) {
            const response = e?.response;
            if(response?.status === 401) return toast.error(`Email ou senha inválido(s)! Caso tenha cadastrado agora, não se esqueça de confirmar seu email para validar o cadastro.`)

            if(response !== undefined) toast.error(`Erro: ${response.data.error}`);
            else toast.error(`Erro de conexão com o servidor`);
        }
    }
    
    return (
        <Container customClass="background">
            <section className={styles.login}>
                <h2>ENTRAR</h2>
                <form onSubmit={handleSubmit}>
                    <Input label="Endereço de Email" name="email" type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input label="Senha" name="senha" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <ButtonSubmit text="ENTRAR"/>
                </form>
                <div className={styles.login_necessidades}>
                    <Link to ="/requisicaoalteraremail" >Atualizar seu email?</Link>
                    <Link to ="/requisicaoalterarsenha" >Não lembra sua senha?</Link>
                    <Link to ="/cadastrar" >Cadastre-se</Link>
                </div>
            </section>
        </Container>
    )
}