import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Setup .env file and check environment vars
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../.env')});
if(!process.env.DB_CONNECTION_URL) throw 'DB_CONNECTION_URL is undefined';
if(!process.env.JWT_SECRET) throw 'JWT_SECRET is undefined';

// Connect to mongodb
await mongoose.connect(process.env.DB_CONNECTION_URL)

// Setup express routes and start the server
import usersRoute from './routes/userRoute.js';
import booksRoute from './routes/booksRoute.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/user', usersRoute);
app.use('/book', booksRoute);

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT || 3000}`));