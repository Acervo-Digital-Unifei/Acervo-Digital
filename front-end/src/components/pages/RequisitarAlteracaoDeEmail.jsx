import styles from './RequisitarAlteracaoDeEmail.module.css'
import Container from '../layouts/Container'
import Input from '../Input'
import ButtonSubmit from '../ButtonSubmit'
import { useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import * as Constants from '../../constants'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'


export default function RequisitarAlteracaoDeEmail() {
    const { user, setUser } = useContext(UserContext);
    const initialized = useRef(false);
    const navigator = useNavigate();

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        if(user === null) {
            alert('Você deve estar logado para alterar seu email!');
            navigator('/');
            return;
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(user === null) {
            alert('Você deve estar logado para alterar seu email!');
            navigator('/');
            return;
        }

        try {
            await axios.post(Constants.USER_REQUEST_CHANGE_EMAIL_POST_URL);
            alert('Email de solicitação de alteração de email enviado.');
            navigator('/');
        } catch(e) {
            const response = e?.response;
            if(response?.status === 403) {
                alert('Login expirado. Tente logar novamente!');
            } else if(response?.data?.error) {
                alert(`Erro: ${response.data.error}`);
            }

            navigator('/');
            return;
        }
    }

    return (
        <Container customClass='background'>
          <section className={styles.atualiza}>
          <h2>REQUISITAR ATUALIZAÇÃO DE EMAIL</h2>
          <form onSubmit={handleSubmit}> 
                    <ButtonSubmit text="REQUISITAR"/>
                </form>
          </section>
        </Container>
    )
}