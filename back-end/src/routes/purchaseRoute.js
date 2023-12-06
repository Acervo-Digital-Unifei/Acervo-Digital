import express from 'express';
import { confirmPurchase } from '../controllers/purchaseController.js';
import { isAuthenticated } from '../utils/auth.js';

const router = express.Router();
router.post('/confirm', isAuthenticated, confirmPurchase);

export default router;