import { UserContext} from '../../App';
import Container from '../layouts/Container'
import styles from "./Profile.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

export default function Profile() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () =>{
        try {sessionStorage.removeItem('token');} catch{}
        setUser(null);
        navigate('/');
    }

    const initialized = useRef(false);
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        if(user === null) {
            toast.error('Você não está logado!');
            navigate('/login');
            return;
        }
    });

    return( 
        <Container customClass='backgroundStandart'>
            <section className={styles.profileclass}>
                <h2>Nome: {user.username}
                <br/>
                Email: {user.email}
                <br/>
                Privilégio:{user.privilege === 'admin' ? 'Administrador' : 'Usuário'}
                </h2>
                    <div>
                    <Link to ="/requisicaoalteraremail" >Alterar email!!</Link>
                    <Link to ="/requisicaoalterarsenha" >Alterar senha!!</Link>

                    </div>
                    
                    <button className='buttonclassprofile' onClick={logout}>Logout</button>

                    
                
            </section>
        </Container>
    )
}