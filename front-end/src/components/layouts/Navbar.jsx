import {Link} from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to='/livros'>Livros</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}