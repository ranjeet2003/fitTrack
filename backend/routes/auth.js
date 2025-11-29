import express from 'express';
import { signup, login, logout, status } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Signup
router.post('/signup', signup);

// Login
router.post('/login', login);

// Logout
router.post('/logout', logout);

// Get user status
router.get('/status', verifyToken, status);

export default router;