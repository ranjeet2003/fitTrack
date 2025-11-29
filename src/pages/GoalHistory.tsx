import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { Target, Trash2, Edit, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface Goal {
  _id: string;
  goalType: string;
  targetWeight: number;
  createdAt: string;
  plan: string;
}

const GoalHistory: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchGoalHistory = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/user/goal/history');
      // Filter out goals that are missing essential data to prevent crashes
      const filteredGoals = res.data.filter(
        (goal: Goal) => goal.goalType && goal.createdAt
      );
      setGoals(filteredGoals);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch goal history.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoalHistory();
  }, [fetchGoalHistory]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await API.delete(`/user/goal/${id}`);
        fetchGoalHistory(); // Refresh the list
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete goal.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-error text-lg mt-8">{error}</div>;
  }

  return (
    <div className="p-4">
      <Card className="p-8">
        <h1 className="text-4xl font-extrabold text-text mb-8 flex items-center justify-center">
          <Target size={40} className="mr-3 text-primary" /> Your Goal History
        </h1>

        {goals.length > 0 ? (
          <div className="space-y-6">
            {goals.map((goal) => {
              const date = new Date(goal.createdAt);
              const formattedDate = !isNaN(date.getTime())
                ? format(date, 'MMMM d, yyyy')
                : 'Date not available';

              return (
                <Card key={goal._id} className="p-6 bg-background border border-border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-primary">{goal.goalType}</h2>
                      <p className="flex items-center text-textSecondary text-sm mt-1">
                        <Calendar size={14} className="mr-2" />
                        Set on: {formattedDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-textSecondary">Target Weight</p>
                      <p className="text-3xl font-bold text-text">{goal.targetWeight} kg</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <h3 className="font-semibold text-text mb-2">Your Plan:</h3>
                    <p className="text-textSecondary">{goal.plan}</p>
                  </div>
                  <div className="flex justify-end items-center mt-4 space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/goal-setup?goalId=${goal._id}`)}>
                      <Edit size={16} className="mr-2" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-error" onClick={() => handleDelete(goal._id)}>
                      <Trash2 size={16} className="mr-2" /> Delete
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-textSecondary mb-6">You don't have any past goals saved.</p>
            <Button onClick={() => navigate('/goal-setup')} variant="primary">
              Set a New Goal
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GoalHistory;
