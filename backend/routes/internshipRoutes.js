import express from 'express';
// --- 1. Import the new function ---
import { 
  getInternships, 
  createInternship, 
  getLatestInternships // <-- New
} from '../controllers/internshipController.js';

const router = express.Router();

// --- 2. Add the new route ---
// This one MUST come BEFORE the '/:id' routes if you add them later
router.get('/latest', getLatestInternships); 

router.get('/', getInternships);
router.post('/', createInternship);

export default router;