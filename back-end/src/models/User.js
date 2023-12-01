import { Schema, model } from 'mongoose';

const User = model('User', new Schema({
    username: {type:String, required: true},
    email: {type: String, required: true},
    passwordCrypt: {type: String, required: true},
    privilege: {type: String, default: 'customer', enum: ['customer', 'admin']},
}), 'users');

export default User;