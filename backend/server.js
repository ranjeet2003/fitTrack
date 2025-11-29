import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import foodRoutes from './routes/food.js';
import { verifyToken } from './middleware/auth.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', verifyToken, userRoutes);
app.use('/api/food', verifyToken, foodRoutes);

app.get('/', (req, res) => {
  res.send('Fitness Tracker Backend API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
