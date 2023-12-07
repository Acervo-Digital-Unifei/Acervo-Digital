import {Link} from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import Logo from '../../../assets/images/logopng.png'
import { MdShoppingCart } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { UserContext } from '../../App';
import { useContext } from 'react';


export default function Navbar() {
    const { user, setUser } = useContext(UserContext);
    return (
        <nav className={styles.navbar}>
            <header>
                <Link to='/'><img src={Logo} className={styles.logo}/></Link>
                <Link to='/' className={styles.linkTitle}><h1>ACERVO DIGITAL</h1></Link>
                <div>
                    <Link to="/carrinho">
                        <MdShoppingCart className={styles.icon}/>
                    </Link>
                    <Link to={user !== null ? '/profile' : '/login'}>
                        <IoPerson className={styles.icon}/>
                    </Link>
                </div>
                
            </header>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to='/'>Home</Link>
                </li>
                <li className={styles.item}>
                    <Link to='/livros'>Livros</Link>
                </li>
                {
                    user === null ? 
                    (<li className={styles.item}>
                        <Link to='/cadastrar'>Cadastrar</Link>
                    </li>) : (<></>)
                }
                {
                    (user !== null && user.privilege === 'admin') ? 
                    (<li className={styles.item}>
                        <Link to='/cadastrarlivro'>Cadastrar Livro</Link>
                    </li>) : (<></>)
                }
            </ul>
        </nav>
    )
}