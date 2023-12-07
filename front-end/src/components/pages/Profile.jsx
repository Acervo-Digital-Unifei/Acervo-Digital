import { UserContext} from '../../App';
import Container from '../layouts/Container'
import styles from "./Profile.module.css"
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';


export default function Profile() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const logout = () =>{
        setUser(null);
        navigate('/');
    }
    return( 
        <Container customClass='backgroundStandart'>
            <section className={styles.profileclass}>
                <h2>Deseja alterar algum dado?</h2>
                <Link to ="/requisicaoalteraremail" >Alterar email!!</Link>
                <Link to ="/requisicaoalterarsenha" >Alterar senha!!</Link>
                <button onClick={logout}>Logout</button>
            </section>
        </Container>
    )
}