import styles from './RequisitarAlteracaoDeSenha.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import { useState } from 'react'
import axios from 'axios';
import * as Constants from '../../constants'

export default function RequisitarAlteracaoDeSenha() {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email) return alert('Campo de email vazio!');

        // TODO: Alterar todos os alerts para algo melhor
        // Possíveis opções:
        // https://www.npmjs.com/package/react-custom-alert
        // https://mui.com/material-ui/react-alert/
        // https://blog.logrocket.com/create-custom-react-alert-message/
        // ou qualquer coisa nesse sentido

        try {
            await axios.post(Constants.USER_REQUEST_CHANGE_PASSWORD_POST_URL, {
                email
            });

            alert('Se existe algum usuário com este endereço de email, um email foi enviado, requisitando a alteração de senha.');
        } catch(e) {
            const response = e?.response;
            if(response?.data?.error) alert(`Erro: ${response.error}`);
        }
    }

    return (
        <Container customClass='background'>
          <section className={styles.trocaPassword}>
          <h2>REQUISIÇÃO DE TROCA DE SENHA</h2>
                <form onSubmit={handleSubmit}> 
                    <Input label="Endereço de Email" name="Email" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value.toLowerCase())}/>
                    <ButtonSubmit text="ENVIAR EMAIL"/>
                </form>
          </section>
        </Container>
    )
}