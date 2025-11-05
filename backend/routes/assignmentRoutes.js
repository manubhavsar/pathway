import express from 'express';
import { 
  getAssignments, 
  createAssignment, 
  submitAssignment, // <-- 1. Import new function
  deleteAssignment  // <-- 2. Import new function
} from '../controllers/assignmentController.js';
import protect from '../middleware/authMiddleware.js'; // Your auth middleware

const router = express.Router();

// This route gets all and creates new
router.route('/')
  .get(protect, getAssignments)
  .post(protect, createAssignment);

// --- 3. ADD THIS NEW ROUTE for submitting ---
router.route('/:id/submit')
  .put(protect, submitAssignment);

// --- 4. ADD THIS NEW ROUTE for deleting ---
// This MUST be after the /:id/submit route
router.route('/:id')
  .delete(protect, deleteAssignment);

export default router;