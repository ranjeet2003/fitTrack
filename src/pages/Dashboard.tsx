import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import LoadingSpinner from '../components/LoadingSpinner';
import { PlusCircle, Utensils, Flame, Scale, Target as TargetIcon, History as HistoryIcon, TrendingUp, Activity, Calendar } from 'lucide-react';
import { Avatar as MuiAvatar, IconButton as MuiIconButton, Button as MuiButton, LinearProgress as MuiLinearProgress, Box as MuiBox, Stack as MuiStack, Typography as MuiTypography } from '@mui/material';

interface Goal {
  goalType: string;
  age: number;
  height: number;
  currentWeight: number;
  targetWeight: number;
  exerciseLevel: string;
  targetTime: string;
  bmi: string;
  dailyCalories: string;
  plan: string;
}

interface FoodEntry {
  id: string;
  foodName: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const [userGoal, setUserGoal] = useState<Goal | null>(null);
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [todayFoodEntries, setTodayFoodEntries] = useState<FoodEntry[]>([]);
  const [totalDailyCalories, setTotalDailyCalories] = useState(0);
  const [loading, setLoading] = useState(true);
  const [foodLoading, setFoodLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [profileRes, foodRes] = await Promise.all([
        API.get('/user/profile'),
        API.get('/food/today'),
      ]);
      setUserGoal(profileRes.data.goal);
      setTodayFoodEntries(foodRes.data.entries);
      setTotalDailyCalories(foodRes.data.totalCalories);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleAddFood = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFoodLoading(true);
    if (!foodName) {
      setError('Food name cannot be empty.');
      setFoodLoading(false);
      return;
    }

    try {
      await API.post('/food/add', { foodName, quantity });
      setFoodName('');
      setQuantity('');
      await fetchDashboardData(); // Refresh data
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add food entry.');
      console.error(err);
    } finally {
      setFoodLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-error text-lg mt-8">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 relative overflow-hidden bg-white rounded-2xl shadow-lg">
            {/* Header Section with Gradient */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.3),transparent)]"></div>
              </div>
              <div className="relative z-10 flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <TargetIcon size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Your Fitness Goal</h2>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {userGoal ? (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600 mb-1">Goal Type</p>
                          <p className="text-2xl font-bold text-gray-800">{userGoal.goalType}</p>
                        </div>
                        <div className="bg-blue-500 p-2 rounded-lg">
                          <TrendingUp size={20} className="text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-600 mb-1">Daily Calories</p>
                          <p className="text-2xl font-bold text-gray-800">{userGoal.dailyCalories} <span className="text-base font-normal text-gray-600">kcal</span></p>
                        </div>
                        <div className="bg-purple-500 p-2 rounded-lg">
                          <Activity size={20} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weight and BMI Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Current Weight</p>
                      <p className="text-3xl font-bold text-gray-800">{userGoal.currentWeight} <span className="text-lg font-normal text-gray-600">kg</span></p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Target Weight</p>
                      <p className="text-3xl font-bold text-gray-800">{userGoal.targetWeight} <span className="text-lg font-normal text-gray-600">kg</span></p>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">BMI</p>
                      <p className="text-3xl font-bold text-gray-800">{userGoal.bmi}</p>
                    </div>
                  </div>

                  {/* Plan Section */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <Calendar size={20} className="text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-800">Your Personalized Plan</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{userGoal.plan}</p>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => navigate('/goal-history')}
                    className="w-full bg-white border-2 border-blue-500 text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Calendar size={20} />
                    <span>View Goal History</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TargetIcon size={40} className="text-gray-400" />
                  </div>
                  <p className="text-xl text-gray-600 mb-6">
                    It looks like you haven't set your fitness goal yet.
                  </p>
                  <button
                    onClick={() => navigate('/goal-setup')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 mx-auto"
                  >
                    <PlusCircle size={20} />
                    <span>Set Your Goal</span>
                  </button>
                </div>
              )}
            </div>
          </Card>

      {/* Daily Calorie Summary */}
      <Card className="p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-text mb-6 flex items-center">
            <Flame size={32} className="mr-3 text-accent" /> Daily Calories
          </h2>
          <div className="text-center mb-8">
            <p className="text-textSecondary text-lg">Calories Consumed Today</p>
            <p className="text-6xl font-extrabold text-primary mt-2">
              {totalDailyCalories}
              <span className="text-2xl text-textSecondary ml-2">kcal</span>
            </p>
          </div>

          {userGoal && (
            <div className="bg-background p-4 rounded-sm border border-border text-center">
              <p className="text-textSecondary text-md">Recommended Daily Intake</p>
              <p className="text-3xl font-bold text-secondary mt-1">
                {userGoal.dailyCalories}
                <span className="text-lg text-textSecondary ml-1">kcal</span>
              </p>
              <div className="mt-4">
                <p className="text-textSecondary text-md">Remaining Calories</p>
                <p className={`text-3xl font-bold mt-1 ${
                  totalDailyCalories > parseInt(userGoal.dailyCalories) ? 'text-error' : 'text-success'
                }`}>
                  {parseInt(userGoal.dailyCalories) - totalDailyCalories}
                  <span className="text-lg text-textSecondary ml-1">kcal</span>
                </p>
              </div>
            </div>
          )}
        </div>
        <Button onClick={() => navigate('/history')} variant="primary" className="w-full mt-8">
          <HistoryIcon size={20} className="mr-2" /> View History
        </Button>
      </Card>

      {/* Food Tracking Card */}
      <Card className="lg:col-span-3 p-8">
        <h2 className="text-3xl font-bold text-text mb-6 flex items-center">
          <Utensils size={32} className="mr-3 text-secondary" /> Track Your Food
        </h2>
        <form onSubmit={handleAddFood} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <Input
              id="foodName"
              label="Food Name"
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="e.g., Apple, Chicken Breast, Pasta"
              required
            />
          </div>
          <div>
            <Input
              id="quantity"
              label="Quantity (optional)"
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 1 medium, 100g, 2 slices"
            />
          </div>
          <div className="md:col-span-3">
            <Button type="submit" className="w-full" disabled={foodLoading}>
              {foodLoading ? 'Adding...' : <><PlusCircle size={20} className="mr-2" /> Add Food Entry</>}
            </Button>
          </div>
          {error && <p className="text-error text-sm mt-2 md:col-span-3">{error}</p>}
        </form>

        <h3 className="text-2xl font-bold text-text mb-4">Today's Entries</h3>
        {todayFoodEntries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-surface border border-border">
              <thead className="bg-background">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-textSecondary uppercase tracking-wider">Food Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-textSecondary uppercase tracking-wider">Quantity</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-textSecondary uppercase tracking-wider">Calories</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-textSecondary uppercase tracking-wider">Protein</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-textSecondary uppercase tracking-wider">Carbs</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-textSecondary uppercase tracking-wider">Fat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {todayFoodEntries.map((entry, index) => (
                  <tr key={entry.id} className={`${index % 2 === 0 ? 'bg-background' : 'bg-surface'}`}>
                    <td className="py-4 px-4 whitespace-nowrap text-text">{entry.foodName}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-textSecondary">{entry.quantity}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-primary">{entry.calories} kcal</td>
                    <td className="py-4 px-4 whitespace-nowrap text-text">{entry.protein}g</td>
                    <td className="py-4 px-4 whitespace-nowrap text-text">{entry.carbs}g</td>
                    <td className="py-4 px-4 whitespace-nowrap text-text">{entry.fat}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-textSecondary text-center py-6">No food entries for today yet. Start tracking!</p>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
