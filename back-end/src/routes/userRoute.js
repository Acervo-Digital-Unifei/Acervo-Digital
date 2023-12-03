import express from 'express';
import { login, register, getSelfProfile, get, requestChangePassword, requestChangeEmail, confirmRequest, requestCodeExists } from '../controllers/userController.js';
import { isAuthenticated, isAuthenticatedAsAdmin } from '../utils/auth.js';

const router = express.Router();
router.post('/login', login);
router.post('/register', register);
router.post('/requestchangepassword', requestChangePassword);
router.post('/requestchangeemail', isAuthenticated, requestChangeEmail);
router.post('/confirmrequest', confirmRequest);
router.get('/requestexists', requestCodeExists);
router.get('/profile', isAuthenticated, getSelfProfile);
router.get('/', isAuthenticatedAsAdmin, get);

export default router;