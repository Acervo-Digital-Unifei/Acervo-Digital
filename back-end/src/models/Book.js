import { Schema, model } from 'mongoose';

const Book = model('Book', new Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    publisher: {type: String, required: true},
    ISBN: {type: String, default: null},
    thumbnail: {type: String, default: null},
    price: {type: Number, required: true},
}), 'books');

export default Book;