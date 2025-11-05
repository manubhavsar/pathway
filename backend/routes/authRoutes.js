import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js'; // <-- Import the middleware

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', registerUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   GET /api/auth/me
// This is a protected route. 'protect' will run first.
router.get('/me', protect, getMe);

export default router;