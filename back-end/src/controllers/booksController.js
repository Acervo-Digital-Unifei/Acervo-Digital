import Book from '../models/Book.js';

export function addBook(req, res) {
    const { title, author, publisher, price, thumbnail } = req.body;

    if (typeof (title) !== 'string' || !title)
        return res.status(422).json({ status: 'error', error: 'Missing title field' });

    if (typeof (author) !== 'string' || !author)
        return res.status(422).json({ status: 'error', error: 'Missing author field' });

    if (typeof (publisher) !== 'string' || !publisher)
        return res.status(422).json({ status: 'error', error: 'Missing publisher field' });

    if (typeof (price) !== 'number' || !price)
        return res.status(422).json({ status: 'error', error: 'Missing price field' });

    if (typeof (thumbnail) !== 'string' || !thumbnail)
        return res.status(422).json({ status: 'error', error: 'Missing thumbnail field' });

    Book.create({
        title, author, publisher, price, thumbnail
    })
        .then(({ _id }) => res.status(200).json({ status: 'ok', id: _id }))
        .catch(() => res.status(400).json({ status: 'error', error: 'Error saving new boow in the database' }));
}

export async function updateBook(req, res) {
    const { id, title, author, publisher, price, thumbnail } = req.body;

    if (typeof (id) !== 'string' || !id)
        return res.status(422).json({ status: 'error', error: 'Missing id field' });

    const updates = {};
    if (typeof (title) === 'string' && title)
        updates.title = title;

    if (typeof (author) === 'string' && author)
        updates.author = author;

    if (typeof (publisher) === 'string' && publisher)
        updates.publisher = publisher;

    if (typeof (price) === 'number' && price)
        updates.price = price;

    if (typeof (thumbnail) === 'string' && thumbnail)
        updates.thumbnail = thumbnail;

    if (Object.keys(updates).length === 0)
        return res.status(400).json({ status: 'error', error: 'Nothing to update' });

    try {
        const book = await Book.findById(id);
        if (book === null)
            return res.status(404).json({ status: 'error', error: 'Book not found' });
        Object.entries(updates).forEach(([key, value]) => book[key] = value);
        book.save()
            .then(() => res.status(200).json({ status: 'ok' }))
            .catch(() => res.status(400).json({ error: 'Error saving book' }));
    } catch {
        return res.status(400).json({ status: 'error', error: 'Error finding book' });
    }

}

export async function deleteBook(req, res) {
    const { id } = req.query;

    if (typeof (id) !== 'string' || !id)
        return res.status(422).json({ status: 'error', error: 'Missing id field' });

    try {
        const book = await Book.findByIdAndDelete(id);
        if (book === null)
            return res.status(404).json({ status: 'error', error: 'Book not found' });
        return res.status(200).json({ status: 'ok' });
    } catch {
        return res.status(400).json({ status: 'error', error: 'Error finding book' });
    }
}

export async function getBooks(req, res) {
    const search = (req.query.search || '').trim();
    const page = (typeof (req.query.page) !== 'number' ? 0 : req.query.page);
    if (page < 0)
        return res.status(400).json({ status: 'error', error: 'Page cannot be negative' });

    try {
        const query = search ? {
            $or: [
                { 'title': {
                    $regex: new RegExp(search, 'i')
                }},
                { 'publisher': {
                    $regex: new RegExp(search, 'i')
                }},
                { 'author': {
                    $regex: new RegExp(search, 'i')
                }},
            ]
        } : {};
        
        const books = (await Book.find(query)
        .skip(20 * page)
        .limit(20))
        .map((x) => {
            return {
                id: x._id,
                title: x.title,
                author: x.author,
                publisher: x.publisher,
                price: x.price,
                thumbnail: x.thumbnail
            }
        });

        return res.status(200).json({status: 'ok', books});
    } catch {
        return res.status(400).json({ status: 'error', error: 'Error finding books in the database'});
    }
}

export async function getBookById(req, res) {
    const { id } = req.query;

    if (typeof (id) !== 'string' || !id)
        return res.status(422).json({ status: 'error', error: 'Missing id field' });

    try {
        const book = await Book.findById(id);
        if (book === null)
            return res.status(404).json({ status: 'error', error: 'Book not found' });

        
        return res.status(200).json({ status: 'ok', book: {
            id: book._id,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            price: book.price,
            thumbnail: book.thumbnail
        }});
    } catch {
        return res.status(400).json({ status: 'error', error: 'Error finding book' });
    }
}