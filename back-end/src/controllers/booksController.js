import Book from '../models/Book.js';

export function addBook(req, res) {
    const { title, author, publisher, price, thumbnail } = req.body;
    
    if(typeof(title) !== 'string' || !title) 
        return res.status(422).json({status: 'error', error: 'Missing title field'});

    if(typeof(author) !== 'string' || !author) 
        return res.status(422).json({status: 'error', error: 'Missing author field'});

    if(typeof(publisher) !== 'string' || !publisher) 
        return res.status(422).json({status: 'error', error: 'Missing publisher field'});
    
    if(typeof(price) !== 'number' || !price)
        return res.status(422).json({status: 'error', error: 'Missing price field'});

    if(typeof(thumbnail) !== 'string' || !thumbnail)
        return res.status(422).json({status: 'error', error: 'Missing thumbnail field'});

    Book.create({
        title, author, publisher, price, thumbnail
    })
    .then(({_id}) => res.status(200).json({status: 'ok', id: _id}))
    .catch(() => res.status(400).json({status: 'error', error: 'Error saving new boow in the database'}));   
}

export async function updateBook(req, res) {
    const { id, title, author, publisher, price, thumbnail } = req.body;

    if(typeof(id) !== 'string' || !id)
        return res.status(422).json({status: 'error', error: 'Missing id field'});

    const updates = {};
    if(typeof(title) === 'string' && title) 
        updates.title = title;

    if(typeof(author) === 'string' && author) 
        updates.author = author;

    if(typeof(publisher) === 'string' && publisher) 
        updates.publisher = publisher;
    
    if(typeof(price) === 'number' && price)
        updates.price = price;

    if(typeof(thumbnail) === 'string' && thumbnail)
        updates.thumbnail = thumbnail;

    if(Object.keys(updates).length === 0)
        return res.status(400).json({status: 'error', error: 'Nothing to update'});

    try {
        const book = await Book.findById(id);
        if(book === null) 
            return res.status(404).json({status: 'error', error: 'Book not found'});
        Object.entries(updates).forEach(([key, value]) => book[key] = value);
        book.save()
            .then(() => res.status(200).json({status: 'ok'}))
            .catch(() => res.status(400).json({error: 'Error saving book'}));
    } catch {
        return res.status(400).json({status: 'error', error: 'Error finding book'});
    }

}

export async function deleteBook(req, res) {
    const { id } = req.query;

    if(typeof(id) !== 'string' || !id)
        return res.status(422).json({status: 'error', error: 'Missing id field'});

    try {
        const book = await Book.findByIdAndDelete(id);
        if(book === null) 
            return res.status(404).json({status: 'error', error: 'Book not found'});
        return res.status(200).json({status: 'ok'});
    } catch {
        return res.status(400).json({status: 'error', error: 'Error finding book'});
    }
}

export async function getBooks(req, res) {

}

export async function getBookById(req, res) {

}