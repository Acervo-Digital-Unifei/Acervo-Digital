import Home from './Home'
import { useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import * as Constants from '../../constants'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import { jwtDecode } from 'jwt-decode'


export default function ConfirmarEmail() {
    const { user, setUser } = useContext(UserContext);

    // TODO: Alterar todos os alerts para algo melhor
    // Possíveis opções:
    // https://www.npmjs.com/package/react-custom-alert
    // https://mui.com/material-ui/react-alert/
    // https://blog.logrocket.com/create-custom-react-alert-message/
    // ou qualquer coisa nesse sentido

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

        setTimeout(async () => {
            try {
                const result = await axios.post(Constants.USER_CONFIRM_REQUEST_POST_URL, {
                    code
                });

                // Token will only be sent when we are registering, and won't be sent when we are changing email
                const token = result.headers['authorization'];
                if(token) {
                    sessionStorage.setItem('token', token);
                
                    const content = jwtDecode(token.split(' ')[1]);
                    setUser({
                        username: content.username,
                        email: content.email,
                        privilege: content.privilege
                    });
                    alert('Conta cadastrada com sucesso!');
                    navigate('/');
                    return;
                }
                 
                alert('Email alterado com sucesso, logue novamente com o novo email!');
                try {sessionStorage.removeItem('token');} catch{} // I don't know if this function throws something
                setUser(null);
                navigate('/');
                return;
            } catch(e) {
                const response = e?.response;
                if(response?.status === 400) alert('Código de confirmação expirado');
                else if(response?.data?.error) alert(`Erro: ${response.data.error}`);
                else alert('Erro de conexão com o servidor');
            }
            navigate('/');
        }, 100);
    }, []);
    
    return (
        <>
            <Home/>
        </>
    )
}