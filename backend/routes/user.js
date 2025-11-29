import express from 'express';
import {
  getProfile,
  createGoal,
  getGoalHistory,
  getGoalById,
  deleteGoal,
  updateGoal,
} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.use(verifyToken);

// Get user profile (including the LATEST goal if set)
router.get('/profile', getProfile);

// Create a new user goal
router.post('/goal', createGoal);

// Get goal history
router.get('/goal/history', getGoalHistory);

// Get a specific goal by ID
router.get('/goal/:id', getGoalById);

// Delete a goal
router.delete('/goal/:id', deleteGoal);

// Update a goal
router.put('/goal/:id', updateGoal);

export default router;