import styles from './AlterarSenha.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Constants from '../../constants'

export default function AlterarSenha() {
    
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const initialized = useRef(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const code = new URLSearchParams(location.search).get('code');
        if(!code) {
            navigate('/');
            return;
        };

        (async () => {
            try {
                const result = await axios.get(`${Constants.USER_REQUEST_EXISTS_GET_URL}?code=${code}`);
                if(!result.data?.response) {
                    alert('Código de alteração de senha expirado!');
                    navigate('/');    
                    return;
                }
            } catch(e) {
                alert('Erro de conexão com o servidor!')
                navigate('/');
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!password) return alert('Campo de senha vazio!');
        if(!passwordConfirm) return alert('Campo de confirmação de senha vazio!');

        if(password !== passwordConfirm)
            return alert('Senha e confirmação de senha não combinam!');

        // TODO: Alterar todos os alerts para algo melhor
        // Possíveis opções:
        // https://www.npmjs.com/package/react-custom-alert
        // https://mui.com/material-ui/react-alert/
        // https://blog.logrocket.com/create-custom-react-alert-message/
        // ou qualquer coisa nesse sentido

        const code = new URLSearchParams(location.search).get('code');
        if(!code) {
            navigate('/');
            return;
        };

        try {
            await axios.post(Constants.USER_CONFIRM_REQUEST_POST_URL, {
                code,
                password
            });

            alert('Senha alterada com sucesso!');
        } catch(e) {
            const response = e?.response;
            if(response?.status === 400) alert('Código de alteração de senha expirado!');
            else if(response?.data?.error) alert(`Erro: ${response.data.error}`);
            else alert('Erro de conexão com o servidor!');
        }
        navigate('/');
    }
    
    return (
        <Container customClass='background'>
          <section className={styles.atualiza}>
          <h2>ALTERAR SENHA</h2>
          <form onSubmit={handleSubmit}> 
                    <Input label="Senha" name="password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
                    <Input label="Confirmação de Senha" name="passwordConfirmation" type="password" placeholder="Confirmação de Senha" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}/>
                    <ButtonSubmit text="ALTERAR"/>
                </form>
          </section>
        </Container>
    )
}