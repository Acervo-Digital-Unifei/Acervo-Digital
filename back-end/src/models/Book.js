import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    publisher: {type: String, required: true},
    ISBN: {type: String, default: null},
    thumbnail: {type: String, default: null},
    price: {type: Number, required: true},
});

const Book = model('Book', BookSchema, 'books');

export default Book;