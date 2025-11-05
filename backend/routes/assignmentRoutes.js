import express from 'express';
import { getAssignments, createAssignment } from '../controllers/assignmentController.js';
import protect from '../middleware/authMiddleware.js'; // <-- Your auth middleware

const router = express.Router();

// We wrap both routes with 'protect'
// This means only logged-in users can access them
router.route('/')
  .get(protect, getAssignments)       // GET /api/assignments
  .post(protect, createAssignment);   // POST /api/assignments

export default router;