import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../api';
import { Card, Button, TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner';
import { Target } from 'lucide-react';

interface Goal {
  goalType: string;
  age: number;
  height: number;
  currentWeight: number;
  targetWeight: number;
  exerciseLevel: string;
  targetTime: string;
}

const GoalSetup: React.FC = () => {
  const [goalType, setGoalType] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [exerciseLevel, setExerciseLevel] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [goalId, setGoalId] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fetchGoal = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await API.get(`/user/goal/${id}`);
      const goal = res.data;
      setGoalType(goal.goalType);
      setAge(goal.age.toString());
      setHeight(goal.height.toString());
      setCurrentWeight(goal.currentWeight.toString());
      setTargetWeight(goal.targetWeight.toString());
      setExerciseLevel(goal.exerciseLevel);
      setTargetTime(goal.targetTime);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch goal data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = searchParams.get('goalId');
    if (id) {
      setGoalId(id);
      fetchGoal(id);
    } else {
      setLoading(false);
    }
  }, [searchParams, fetchGoal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (!goalType || !age || !height || !currentWeight || !targetWeight || !exerciseLevel || !targetTime) {
      setError('All fields are required.');
      setSubmitting(false);
      return;
    }

    const goalData = {
      goalType,
      age: parseInt(age),
      height: parseFloat(height),
      currentWeight: parseFloat(currentWeight),
      targetWeight: parseFloat(targetWeight),
      exerciseLevel,
      targetTime,
    };

    try {
      if (goalId) {
        await API.put(`/user/goal/${goalId}`, goalData);
        alert('Goal updated successfully!');
      } else {
        await API.post('/user/goal', goalData);
        alert('Goal set successfully!');
      }
      navigate('/goal-history');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save goal. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)',
        padding: 2, // p-4
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '600px', // max-w-2xl (approx 2xl is 24rem * 16px = 384px, but using 600px for better fit for form)
          padding: 4, // p-8
          backgroundColor: 'background.paper', // Assuming Card needs a background
          borderRadius: 1, // Rounded-sm
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'extrabold', color: 'text.primary', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <Target size={40} style={{ marginRight: '0.75rem', color: 'var(--primary)' }} /> {goalId ? 'Edit Your' : 'Set Your'} Fitness Goal
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ color: 'text.secondary', mb: 4 }}>
          {goalId ? 'Update your existing fitness goal.' : 'Tell us about your fitness aspirations to get a personalized plan.'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <FormControl fullWidth sx={{ gridColumn: 'span 2' }}>
            <InputLabel id="goalType-label">Goal Type</InputLabel>
            <Select
              labelId="goalType-label"
              id="goalType"
              value={goalType}
              label="Goal Type"
              onChange={(e) => setGoalType(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'border.main' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                color: 'text.primary',
              }}
            >
              <MenuItem value="">Select your goal</MenuItem>
              <MenuItem value="Fat Loss">Fat Loss</MenuItem>
              <MenuItem value="Weight Gain">Weight Gain</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            id="age"
            label="Age (years)"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 30"
            inputProps={{ min: "1" }}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            id="height"
            label="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g., 175"
            inputProps={{ min: "1", step: "0.1" }}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            id="currentWeight"
            label="Current Weight (kg)"
            type="number"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            placeholder="e.g., 70"
            inputProps={{ min: "1", step: "0.1" }}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            id="targetWeight"
            label="Target Weight (kg)"
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            placeholder="e.g., 65"
            inputProps={{ min: "1", step: "0.1" }}
            required
            variant="outlined"
          />

          <FormControl fullWidth>
            <InputLabel id="exerciseLevel-label">Exercise Level</InputLabel>
            <Select
              labelId="exerciseLevel-label"
              id="exerciseLevel"
              value={exerciseLevel}
              label="Exercise Level"
              onChange={(e) => setExerciseLevel(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'border.main' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                color: 'text.primary',
              }}
            >
              <MenuItem value="">Select your activity level</MenuItem>
              <MenuItem value="Sedentary (little or no exercise)">Sedentary</MenuItem>
              <MenuItem value="Lightly active (light exercise/sports 1-3 days/week)">Lightly Active</MenuItem>
              <MenuItem value="Moderately active (moderate exercise/sports 3-5 days/week)">Moderately Active</MenuItem>
              <MenuItem value="Very active (hard exercise/sports 6-7 days a week)">Very Active</MenuItem>
              <MenuItem value="Extra active (very hard exercise/physical job)">Extra Active</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="targetTime-label">Target Time to Achieve Goal</InputLabel>
            <Select
              labelId="targetTime-label"
              id="targetTime"
              value={targetTime}
              label="Target Time to Achieve Goal"
              onChange={(e) => setTargetTime(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'border.main' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
                color: 'text.primary',
              }}
            >
              <MenuItem value="">Select target timeframe</MenuItem>
              <MenuItem value="1 month">1 Month</MenuItem>
              <MenuItem value="3 months">3 Months</MenuItem>
              <MenuItem value="6 months">6 Months</MenuItem>
              <MenuItem value="1 year">1 Year</MenuItem>
              <MenuItem value="More than 1 year">More than 1 Year</MenuItem>
            </Select>
          </FormControl>

          {error && <Typography color="error" variant="body2" align="center" sx={{ mt: 2, gridColumn: 'span 2' }}>{error}</Typography>}

          <Box sx={{ gridColumn: 'span 2', mt: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={submitting}
              sx={{ py: 1.5, fontSize: '1rem' }}
            >
              {submitting ? 'Saving Goal...' : (goalId ? 'Update Goal' : 'Set Goal')}
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default GoalSetup;
