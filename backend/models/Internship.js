// backend/models/Internship.js

import mongoose from 'mongoose'; // <-- 1. Use import instead of require

const InternshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Remote', 'Hybrid', 'On-site'], // Only allows these values
    required: true,
  },
  duration: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  companyLogo: {
    type: String, // URL to the logo
  },
});

// --- 2. THIS IS THE FIX ---
// Change 'module.exports = ...' to 'export default ...'
export default mongoose.model('Internship', InternshipSchema);