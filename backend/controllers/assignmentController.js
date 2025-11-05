import Assignment from '../models/Assignment.js';
import mongoose from 'mongoose'; // Import mongoose to check for valid ObjectIDs

// @desc    Get all assignments for the logged-in user
// @route   GET /api/assignments
// @access  Private
export const getAssignments = async (req, res) => {
  try {
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
      user: req.user.id, // Link to the logged-in user
    });

    const assignment = await newAssignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- NEW FUNCTION TO SUBMIT ---
// @desc    Update assignment status to "Submitted"
// @route   PUT /api/assignments/:id/submit
// @access  Private
export const submitAssignment = async (req, res) => {
  try {
    // Find the assignment by its ID and the logged-in user
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Update the status and save
    assignment.status = 'Submitted';
    await assignment.save();
    
    res.json(assignment); // Send back the updated assignment
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- NEW FUNCTION TO DELETE ---
// @desc    Delete an assignment
// @route   DELETE /api/assignments/:id
// @access  Private
export const deleteAssignment = async (req, res) => {
  try {
    // Find the assignment by its ID and the logged-in user
    const assignment = await Assignment.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Delete the assignment
    await assignment.deleteOne();
    
    res.json({ message: 'Assignment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};