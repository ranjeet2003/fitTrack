import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  goalType: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  currentWeight: { type: Number, required: true },
  targetWeight: { type: Number, required: true },
  exerciseLevel: { type: String, required: true },
  targetTime: { type: String, required: true },
  bmi: { type: String, required: true },
  bmiStatus: { type: String },
  dailyCalories: { type: Number, required: true },
  dailyProtein: { type: Number, required: true },
  dailyCarbs: { type: Number, required: true },
  dailyFat: { type: Number, required: true },
  plan: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Goal', GoalSchema);
