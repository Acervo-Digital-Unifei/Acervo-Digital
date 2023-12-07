import styles from './RequisitarAlteracaoDeSenha.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import { useState } from 'react'
import axios from 'axios';
import * as Constants from '../../constants'
import { toast } from 'react-toastify';

export default function RequisitarAlteracaoDeSenha() {

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email) return toast.error('Campo de email vazio!');

        try {
            await axios.post(Constants.USER_REQUEST_CHANGE_PASSWORD_POST_URL, {
                email
            });

            toast.info('Se existe algum usuário com este endereço de email, um email foi enviado, requisitando a alteração de senha.');
        } catch(e) {
            const response = e?.response;
            if(response?.data?.error) toast.error(`Erro: ${response.error}`);
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