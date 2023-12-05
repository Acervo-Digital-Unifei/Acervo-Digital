import express from 'express';
import { isAuthenticated, isAuthenticatedAsAdmin } from '../utils/auth.js';
import { addBook, updateBook, deleteBook, getBooks, getBookById } from '../controllers/booksController.js';

const router = express.Router();

router.post('/add', isAuthenticatedAsAdmin, addBook);
router.post('/update', isAuthenticatedAsAdmin, updateBook);
router.delete('/', isAuthenticatedAsAdmin, deleteBook);
router.get('/', getBooks);
router.get('/byid', getBookById);

export default router;