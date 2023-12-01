import express from 'express';
import { login, register, getSelfProfile, get } from '../controllers/userController.js';
import { isAuthenticated, isAuthenticatedAsAdmin } from '../utils/auth.js';

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.get('/profile', isAuthenticated, getSelfProfile);
router.get('/', isAuthenticatedAsAdmin, get);

export default router;