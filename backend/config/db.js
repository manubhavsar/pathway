// backend/config/db.js
import mongoose from 'mongoose';
// We don't need dotenv here because server.js already handles it

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected Successfully! 🚀');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    // Exit process with failure
    process.exit(1);
  }
};

// This is the line that fixes the error
export default connectDB;