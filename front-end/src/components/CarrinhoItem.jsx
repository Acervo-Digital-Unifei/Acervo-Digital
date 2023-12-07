import styles from './CarrinhoItem.module.css'

export default function CarrinhoItem({nome, preco, qtd}) {
    return (
        <div className={styles.carrItem}>
            <p>The book is on...{nome}</p>
            <div className={styles.carrUnity}>
                <p>R$0,00{preco}</p>
                <p>1{qtd}</p>
            </div>
        </div>
    )
}

