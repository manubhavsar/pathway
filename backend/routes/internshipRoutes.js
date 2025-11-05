// backend/routes/internships.js
import express from 'express';
import { getInternships, createInternship } from '../controllers/internshipController.js';

const router = express.Router();

// This tells Express:
// 1. When a GET request comes to '/', use the 'getInternships' function.
// 2. When a POST request comes to '/', use the 'createInternship' function.

router.get('/', getInternships);
router.post('/', createInternship);

export default router;