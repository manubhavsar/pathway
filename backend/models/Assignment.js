import mongoose from 'mongoose';

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Submitted', 'Not Started'],
    default: 'Not Started',
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low', 'Critical'],
    default: 'Medium',
  },
  description: {
    type: String,
  },
  // This is the most important part for your demo
  // It links the assignment to the user who created it
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true }); // Adds createdAt/updatedAt

export default mongoose.model('Assignment', AssignmentSchema);