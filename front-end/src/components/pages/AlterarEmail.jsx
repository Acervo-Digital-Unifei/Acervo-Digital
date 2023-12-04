import styles from './AlterarEmail.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Constants from '../../constants'

export default function AlterarEmail() {

    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");

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
                    alert('Código de alteração de email expirado!');
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

        if(!email) return alert('Campo de email vazio!');
        if(!emailConfirm) return alert('Campo de confirmação de email vazio!');
        if(email !== emailConfirm) return alert('Emails não combinam!');

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
                email
            });

            alert(`Email de confirmação enviado a "${email}"`);
        } catch(e) {
            const response = e?.response;
            if(response?.data?.error === 'Email already registered') alert(`Email "${email}" já está em uso!`)
            else if (response?.status === 400) alert('Código de alteração de email expirado!');
            else if(response?.data?.error) alert(`Erro: ${response.data.error}`);
            else alert('Erro de conexão com o servidor!');
        }
        navigate('/');
    }

    return (
        <Container customClass='background'>
          <section className={styles.atualiza}>
          <h2>ATUALIZAR EMAIL</h2>
          <form onSubmit={handleSubmit}> 
                <Input label="Novo Endereço de Email" name="email" type="email" placeholder="Novo email" value={email} onChange={e => setEmail(e.target.value.toLowerCase())}/>
                <Input label="Confirmação de Endereço de Email" name="emailConfirm" type="email" placeholder="Confirmação de email" value={emailConfirm} onChange={e => setEmailConfirm(e.target.value.toLowerCase())}/>
                <ButtonSubmit text="ATUALIZAR"/>
            </form>
          </section>
        </Container>
    )
}