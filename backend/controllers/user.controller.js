import User from '../models/User.js';
import Goal from '../models/Goal.js';
import { getGeminiResponse } from '../utils/gemini.js';

const getBmiStatus = (bmi) => {
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const goal = await Goal.findOne({ user: req.user.id }).sort({ createdAt: -1 });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userProfile = {
      id: user.id,
      username: user.username,
      email: user.email,
      goal: goal ? {
        ...goal.toObject(),
        bmiStatus: getBmiStatus(goal.bmi),
      } : null,
    };

    res.json(userProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const createGoal = async (req, res) => {
  const {
    goalType,
    age,
    height,
    currentWeight,
    targetWeight,
    exerciseLevel,
    targetTime,
  } = req.body;

  try {
    // 1. Calculate BMI
    const heightInMeters = height / 100;
    const bmi = (currentWeight / (heightInMeters * heightInMeters)).toFixed(2);
    const bmiStatus = getBmiStatus(bmi);

    // 2. Create a detailed prompt for Gemini API
    const prompt = `
      Based on the following user data, calculate their daily calorie needs and create a brief, actionable fitness plan.
      - Goal: ${goalType}
      - Age: ${age}
      - Height: ${height} cm
      - Current Weight: ${currentWeight} kg
      - Target Weight: ${targetWeight} kg
      - Exercise Level: ${exerciseLevel}
      - Time to Achieve Goal: ${targetTime}

      Provide the response as a single, minified JSON object with no markdown. The JSON should have two keys:
      1. "daily_goals": An object with "calories", "protein", "carbs", and "fat" (all as numbers).
      2. "plan": A short (2-3 sentences) descriptive and encouraging fitness plan.

      Example:
      {"daily_goals":{"calories":2000,"protein":150,"carbs":200,"fat":60},"plan":"To achieve your fat loss goal, focus on a consistent calorie deficit. Incorporate strength training 3-4 times a week to build muscle, and add 2-3 cardio sessions for heart health. Stay hydrated and be patient with your progress!"}
    `;

    // 3. Get response from Gemini API
    const geminiResponse = await getGeminiResponse(prompt);
    const parsedResponse = JSON.parse(geminiResponse.trim());

    const { daily_goals: dailyGoals, plan } = parsedResponse;

    // 4. Prepare goal fields for the database
    const goalFields = {
      user: req.user.id,
      goalType,
      age,
      height,
      currentWeight,
      targetWeight,
      exerciseLevel,
      targetTime,
      bmi,
      bmiStatus,
      dailyCalories: dailyGoals.calories,
      dailyProtein: dailyGoals.protein,
      dailyCarbs: dailyGoals.carbs,
      dailyFat: dailyGoals.fat,
      plan,
    };

    // 5. Create and save the new goal
    const newGoal = new Goal(goalFields);
    await newGoal.save();

    res.status(201).json({ message: 'Goal set successfully!', goal: newGoal });
  } catch (err) {
    console.error('Error setting goal:', err.message);
    res.status(500).send('Server error');
  }
};

export const getGoalHistory = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    console.error('Error fetching goal history:', err.message);
    res.status(500).send('Server error');
  }
};

export const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user.id });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found.' });
    }

    res.json(goal);
  } catch (err) {
    console.error('Error fetching goal:', err.message);
    res.status(500).send('Server error');
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user.id });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found.' });
    }

    await goal.remove();
    res.json({ message: 'Goal deleted successfully.' });
  } catch (err) {
    console.error('Error deleting goal:', err.message);
    res.status(500).send('Server error');
  }
};

export const updateGoal = async (req, res) => {
  const {
    goalType,
    age,
    height,
    currentWeight,
    targetWeight,
    exerciseLevel,
    targetTime,
  } = req.body;

  try {
    let goal = await Goal.findOne({ _id: req.params.id, user: req.user.id });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found.' });
    }

    // 1. Calculate BMI
    const heightInMeters = height / 100;
    const bmi = (currentWeight / (heightInMeters * heightInMeters)).toFixed(2);
    const bmiStatus = getBmiStatus(bmi);

    // 2. Create a detailed prompt for Gemini API
    const prompt = `
      Based on the following user data, calculate their daily calorie needs and create a brief, actionable fitness plan.
      - Goal: ${goalType}
      - Age: ${age}
      - Height: ${height} cm
      - Current Weight: ${currentWeight} kg
      - Target Weight: ${targetWeight} kg
      - Exercise Level: ${exerciseLevel}
      - Time to Achieve Goal: ${targetTime}

      Provide the response as a single, minified JSON object with no markdown. The JSON should have two keys:
      1. "daily_goals": An object with "calories", "protein", "carbs", and "fat" (all as numbers).
      2. "plan": A short (2-3 sentences) descriptive and encouraging fitness plan.

      Example:
      {"daily_goals":{"calories":2000,"protein":150,"carbs":200,"fat":60},"plan":"To achieve your fat loss goal, focus on a consistent calorie deficit. Incorporate strength training 3-4 times a week to build muscle, and add 2-3 cardio sessions for heart health. Stay hydrated and be patient with your progress!"}
    `;

    // 3. Get response from Gemini API
    const geminiResponse = await getGeminiResponse(prompt);
    const parsedResponse = JSON.parse(geminiResponse.trim());

    const { daily_goals: dailyGoals, plan } = parsedResponse;

    // 4. Update goal fields
    goal.goalType = goalType;
    goal.age = age;
    goal.height = height;
    goal.currentWeight = currentWeight;
    goal.targetWeight = targetWeight;
    goal.exerciseLevel = exerciseLevel;
    goal.targetTime = targetTime;
    goal.bmi = bmi;
    goal.bmiStatus = bmiStatus;
    goal.dailyCalories = dailyGoals.calories;
    goal.dailyProtein = dailyGoals.protein;
    goal.dailyCarbs = dailyGoals.carbs;
    goal.dailyFat = dailyGoals.fat;
    goal.plan = plan;

    await goal.save();
    res.json({ message: 'Goal updated successfully!', goal });

  } catch (err) {
    console.error('Error updating goal:', err.message);
    res.status(500).send('Server error');
  }
};
