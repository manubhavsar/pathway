import Assignment from '../models/Assignment.js';

// @desc    Get all assignments for the logged-in user
// @route   GET /api/assignments
// @access  Private
export const getAssignments = async (req, res) => {
  try {
    // req.user.id comes from the authMiddleware
    // This finds only assignments that match the logged-in user's ID
    const assignments = await Assignment.find({ user: req.user.id }).sort({ dueDate: 'asc' });
    res.json(assignments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new assignment
// @route   POST /api/assignments
// @access  Private
export const createAssignment = async (req, res) => {
  const { title, course, dueDate, priority, description, status } = req.body;

  try {
    const newAssignment = new Assignment({
      title,
      course,
      dueDate,
      priority,
      description,
      status,
      user: req.user.id, // <-- This links the new assignment to the user
    });

    const assignment = await newAssignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};