import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { setupEmailTransporter } from './utils/email.js';

// Setup .env file
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, '../.env')});

// Check if all required environment variables are declared
const requiredDeclarations = [
    'DB_CONNECTION_URL',
    'JWT_SECRET',
    'FRONTEND_CHANGE_PASSWORD_URL',
    'FRONTEND_CHANGE_EMAIL_URL',
    'FRONTEND_CONFIRM_EMAIL_URL',
    'EMAIL_SMTP_HOST',
    'EMAIL_SMTP_PORT',
    'EMAIL_USERNAME',
    'EMAIL_PASSWORD'
];
const missingDeclarations = requiredDeclarations.filter(x => !process.env[x]);
if(missingDeclarations.length !== 0) {
    missingDeclarations.forEach(x => console.error(`Missing ${x} declaration`));
    throw `Missing ${missingDeclarations.length} environment variable(s)`;
}

// Connect to mongodb
await mongoose.connect(process.env.DB_CONNECTION_URL)

// Setup email transporter
await setupEmailTransporter({
    service: process.env.EMAIL_SERVICE || 'undefined',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE || true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Setup express routes and start the server
import usersRoute from './routes/userRoute.js';
import booksRoute from './routes/booksRoute.js';
import purchaseRoute from './routes/purchaseRoute.js';

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/user', usersRoute);
app.use('/book', booksRoute);
app.use('/purchase', purchaseRoute);

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT || 3000}`));