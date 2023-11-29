import {Link} from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import Logo from '../../../assets/images/logopng.png'
import { MdShoppingCart } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
export default function Navbar() {
    return (
        
        <nav className={styles.navbar}>
            <header>
                <Link to='/'><img src={Logo} className={styles.logo}/></Link>
                <h1>ACERVO DIGITAL</h1>
                <div>
                    <MdShoppingCart className={styles.icon}/>
                    <IoPerson className={styles.icon}/>
                </div>
                
            </header>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to='/livros'>Livros</Link>
                </li>
                <li className={styles.item}>
                    <Link to='/'>Home</Link>
                </li>
            </ul>
        </nav>
    )
}