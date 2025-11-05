// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // .js is important
import internshipRoutes from './routes/internshipRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Load .env variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('Pathway API is running... 🏃‍♂️');
});
app.use('/api/auth', authRoutes);

// Use the internship routes
app.use('/api/internships', internshipRoutes);

// --- Start the Server ---
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});