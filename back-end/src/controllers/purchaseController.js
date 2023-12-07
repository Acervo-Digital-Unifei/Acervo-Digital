import Book from '../models/Book.js';
import { sendEmail } from '../utils/email.js'

export async function confirmPurchase(req, res) {
    const items = req.body.items;
    if(typeof(items) !== 'object')
        return res.status(422).json({status: 'error', error: 'Missing field items'});

    const purchaseDate = new Date();
    
    const entries = [];

    try {
        for(const [id, quantity] of Object.entries(items)) {
            if(typeof(quantity) !== 'number')
                return res.status(422).json({status: 'error', error: 'Quantity is not a number'}); 

            const book = await Book.findById(id);
            entries.push({
                name: `${book.title}, de ${book.author}, editora ${book.publisher}`,
                quantity,
                price: book.price,
                totalPrice: quantity * book.price  
            });
        }
    } catch(e) {
        return res.status(400).json({status: 'error', error: 'Error fetching book from database'}); 
    }
    
    if(entries.length === 0)
        return res.status(422).json({status: 'error', error: 'Empty items list'}); 

    const totalPrice = entries.reduce((sum, x) => sum + x.totalPrice, 0);
    
    const html = 
    `
    <html>
    <b>Detalhe da compra realizada na livraria Acervo Digital no dia ${purchaseDate.toLocaleDateString('pt-br')} às ${("00" + purchaseDate.getHours()).slice(-2)}:${("00" + purchaseDate.getMinutes()).slice(-2)}, no valor de ${totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}: </b>
    <br>
    <table width="600" style="border:1px solid #333">
        <tr>
            <td><b>Livro</b></td>
            <td><b>Preço</b></td>
            <td><b>Quantidade</b></td>
            <td><b>Subtotal</b></td>
        </tr>
        ${entries.map(({name, quantity, price, totalPrice}) => {
            return `
            <tr>
                <td><b>${name}</b></td>
                <td><b>${price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b></td>
                <td><b>${quantity}</b></td>
                <td><b>${totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b></td>
            </tr>
            `
        }).join('')}
        <tr><td colspan="3"><b>Total: </b></td><td><b>${totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</b></td></tr>
    </table><br>
    </html>
    `

    try {
        await sendEmail({
            to: req.email,
            subject: 'Descrição de Compra',
            html
        });
    } catch {
        return res.status(400).json({status: 'error', error: 'Error sending confirmation email'});
    }
    
    res.status(200).json({status: 'ok'});
}