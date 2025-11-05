import Internship from "../models/Internship.js";

// GET all internships
export const getInternships = async (req, res) => {
  try {
    // Find all internships and sort them (newest first)
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- THIS IS THE NEW FUNCTION ---
// @desc    Get top 3 latest internships
// @route   GET /api/internships/latest
// @access  Public (or Private, if you add 'protect')
export const getLatestInternships = async (req, res) => {
  try {
    // Find all, sort by creation date (newest first), and limit to 3
    const internships = await Internship.find().sort({ createdAt: -1 }).limit(3);
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// --- END OF NEW FUNCTION ---

// POST new internship
export const createInternship = async (req, res) => {
  try {
    const newInternship = new Internship(req.body);
    await newInternship.save();
    res.status(201).json(newInternship);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};