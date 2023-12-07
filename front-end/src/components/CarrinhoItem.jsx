import styles from './CarrinhoItem.module.css'

export default function CarrinhoItem({nome, preco, qtd}) {
    return (
        <div className={styles.carrItem}>
            <p>{nome}</p>
            <div className={styles.carrUnity}>
                <p>{preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                <p>{`${qtd}`}</p>
            </div>
        </div>
    )
}

