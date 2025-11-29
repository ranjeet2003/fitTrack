import express from 'express';
import {
  addFoodEntry,
  getTodaysFood,
  getHistory,
  getMealSuggestion,
  deleteFoodEntry,
} from '../controllers/food.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.use(verifyToken);

// Add food entry
router.post('/add', addFoodEntry);

// Get today's food entries and total calories
router.get('/today', getTodaysFood);

// Get history (day-wise calorie totals)
router.get('/history', getHistory);

// Get meal suggestion
router.post('/suggestion', getMealSuggestion);

// Delete food entry
router.delete('/:id', deleteFoodEntry);

export default router;