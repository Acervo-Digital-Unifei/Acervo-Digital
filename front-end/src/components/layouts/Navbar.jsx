import {Link} from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import Logo from '../../../assets/images/logopng.png'
import { MdShoppingCart } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
export default function Navbar({props}) {
    return (
        
        <nav className={styles.navbar}>
            <header>
                <Link to='/'><img src={Logo} className={styles.logo}/></Link>
                <h1>ACERVO DIGITAL</h1>
                <div>
                    <Link to="/carrinho">
                        <MdShoppingCart className={styles.icon}/>
                    </Link>
                    <Link to='/login'>
                        <IoPerson className={styles.icon}/>
                    </Link>
                </div>
                
            </header>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to='/livros'>Livros</Link>
                </li>
                <li className={styles.item}>
                    <Link to='/'>Home</Link>
                </li>
                {props && props.map((item) => (
                <li className={styles.item}>
                    <Link to={item.link}>{item.text}</Link>
                </li>
                ))}
            </ul>
        </nav>
    )
}