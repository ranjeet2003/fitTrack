import React, { useEffect, useState, useCallback } from 'react';
import API from '../api';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { History as HistoryIcon, CalendarDays, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define PALETTE for recharts
const PALETTE = {
  primary: '#9E7FFF',
  secondary: '#38bdf8',
  accent: '#f472b6',
  background: '#171717',
  surface: '#262626',
  text: '#FFFFFF',
  textSecondary: '#A3A3A3',
  border: '#2F2F2F',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

interface DailyCalorieData {
  date: string;
  totalCalories: number;
}

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState<DailyCalorieData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.get('/food/history');
      setHistoryData(res.data.history);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch history data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

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
          <HistoryIcon size={40} className="mr-3 text-secondary" /> Your Calorie History
        </h1>

        {historyData.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {historyData.map((day) => (
                <div key={day.date} className="bg-background p-5 rounded-sm border border-border flex items-center justify-between shadow-md transition-transform duration-200 hover:scale-[1.02]">
                  <div className="flex items-center">
                    <CalendarDays size={24} className="text-primary mr-3" />
                    <div>
                      <p className="text-lg font-semibold text-text">{day.date}</p>
                      <p className="text-sm text-textSecondary">Total Calories</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-accent">{day.totalCalories} kcal</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-text mb-6 flex items-center justify-center">
              <Flame size={32} className="mr-3 text-primary" /> Calorie Consumption Over Time
            </h2>
                    <div className="bg-background p-6 rounded-sm border border-border h-64 md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={historyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={PALETTE.border} />
                  <XAxis dataKey="date" stroke={PALETTE.textSecondary} tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                  <YAxis stroke={PALETTE.textSecondary} />
                  <Tooltip
                    contentStyle={{ backgroundColor: PALETTE.surface, border: `1px solid ${PALETTE.border}`, borderRadius: '8px' }}
                    labelStyle={{ color: PALETTE.primary, fontWeight: 'bold' }}
                    itemStyle={{ color: PALETTE.text }}
                    formatter={(value: number) => [`${value} kcal`, 'Calories']}
                  />
                  <Bar dataKey="totalCalories" fill={PALETTE.primary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <p className="text-textSecondary text-center py-10 text-xl">
            No calorie history available yet. Start tracking your food to see your progress!
          </p>
        )}
      </Card>
    </div>
  );
};

export default History;
