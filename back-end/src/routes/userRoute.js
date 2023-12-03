import express from 'express';
import { login, register, getSelfProfile, get, changePassword, changeEmail } from '../controllers/userController.js';
import { isAuthenticated, isAuthenticatedAsAdmin } from '../utils/auth.js';

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.post('/changepassword', isAuthenticated, changePassword);
router.post('/changeemail', isAuthenticated, changeEmail);
router.get('/profile', isAuthenticated, getSelfProfile);
router.get('/', isAuthenticatedAsAdmin, get);

export default router;