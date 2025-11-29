import mongoose from 'mongoose';
import FoodEntry from '../models/FoodEntry.js';
import { getGeminiResponse } from '../utils/gemini.js';
import Goal from '../models/Goal.js';

export const addFoodEntry = async (req, res) => {
  const { foodName, quantity } = req.body;

  if (!foodName) {
    return res.status(400).json({ message: 'Food name is required.' });
  }

  const prompt = `
    Estimate the calories, protein, carbs, and fat in "${quantity ? quantity + ' of ' : ''}${foodName}".
    Provide the response as a JSON object with keys "calories", "protein", "carbs", and "fat".
    If you cannot estimate, return "0" for all values.
    Example: {"calories": 250, "protein": 10, "carbs": 20, "fat": 15}
  `;

  try {
    const geminiResponse = await getGeminiResponse(prompt);
    const jsonMatch = geminiResponse.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : geminiResponse;
    const nutritionInfo = JSON.parse(jsonString.trim());

    const newFoodEntry = new FoodEntry({
      user: req.user.id,
      foodName,
      calories: nutritionInfo.calories || 0,
      protein: nutritionInfo.protein || 0,
      carbs: nutritionInfo.carbs || 0,
      fat: nutritionInfo.fat || 0,
    });

    await newFoodEntry.save();

    res.status(201).json({ message: 'Food entry added successfully!', entry: newFoodEntry });
  } catch (error) {
    console.error('Error adding food entry with Gemini API:', error);
    res.status(500).json({ message: 'Failed to add food entry. Please try again.', error: error.message });
  }
};

export const getTodaysFood = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userFoodEntries = await FoodEntry.find({
      user: req.user.id,
      date: { $gte: today },
    });

    const totalCalories = userFoodEntries.reduce((sum, entry) => sum + entry.calories, 0);

    res.json({ entries: userFoodEntries, totalCalories });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await FoodEntry.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          totalCalories: { $sum: '$calories' },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: '$_id',
          totalCalories: 1,
          _id: 0,
        },
      },
    ]);

    res.json({ history });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getMealSuggestion = async (req, res) => {
  try {
    const goal = await Goal.findOne({ user: req.user.id });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found. Please set your goal first.' });
    }

    const { dailyCalories, dailyProtein, dailyCarbs, dailyFat } = goal;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const userFoodEntries = await FoodEntry.find({
      user: req.user.id,
      date: { $gte: today },
    });

    const totalCalories = userFoodEntries.reduce((sum, entry) => sum + entry.calories, 0);
    const totalProtein = userFoodEntries.reduce((sum, entry) => sum + entry.protein, 0);
    const totalCarbs = userFoodEntries.reduce((sum, entry) => sum + entry.carbs, 0);
    const totalFat = userFoodEntries.reduce((sum, entry) => sum + entry.fat, 0);

    const remainingCalories = dailyCalories - totalCalories;
    const remainingProtein = dailyProtein - totalProtein;
    const remainingCarbs = dailyCarbs - totalCarbs;
    const remainingFat = dailyFat - totalFat;

    const prompt = `
      Based on the remaining daily nutrition goals:
      - Calories: ${remainingCalories}
      - Protein: ${remainingProtein}g
      - Carbs: ${remainingCarbs}g
      - Fat: ${remainingFat}g

      Suggest a single meal (breakfast, lunch, or dinner) that helps meet these targets.
      Provide the response as a JSON object with keys "meal_suggestion" and "estimated_nutrition".
      "meal_suggestion" should be a string describing the meal.
      "estimated_nutrition" should be an object with "calories", "protein", "carbs", and "fat".
      Example: {
        "meal_suggestion": "Grilled chicken salad with a light vinaigrette.",
        "estimated_nutrition": { "calories": 350, "protein": 40, "carbs": 10, "fat": 15 }
      }
    `;

    const geminiResponse = await getGeminiResponse(prompt);
    const jsonMatch = geminiResponse.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : geminiResponse;
    const suggestion = JSON.parse(jsonString.trim());

    res.json({ suggestion });
  } catch (error) {
    console.error('Error getting meal suggestion:', error);
    res.status(500).json({ message: 'Failed to get meal suggestion. Please try again.', error: error.message });
  }
};

export const deleteFoodEntry = async (req, res) => {
  try {
    const foodEntry = await FoodEntry.findById(req.params.id);

    if (!foodEntry) {
      return res.status(404).json({ message: 'Food entry not found.' });
    }

    if (foodEntry.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized.' });
    }

    await foodEntry.remove();

    res.json({ message: 'Food entry removed successfully.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
