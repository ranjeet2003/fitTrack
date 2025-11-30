import React, { useEffect, useState, useCallback } from 'react';
import API from '../api';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook
import { History as HistoryIcon, CalendarDays, Flame } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DailyCalorieData {
  date: string;
  totalCalories: number;
}

const History: React.FC = () => {
  const [historyData, setHistoryData] = useState<DailyCalorieData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { theme } = useTheme(); // Get the current theme
  const [palette, setPalette] = useState({});

  // Effect to update the palette when the theme changes
  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const newPalette = {
      primary: rootStyle.getPropertyValue('--color-primary').trim(),
      secondary: rootStyle.getPropertyValue('--color-secondary').trim(),
      text: rootStyle.getPropertyValue('--color-text').trim(),
      textSecondary: rootStyle.getPropertyValue('--color-textSecondary').trim(),
      surface: rootStyle.getPropertyValue('--color-surface').trim(),
      border: rootStyle.getPropertyValue('--color-border').trim(),
    };
    setPalette(newPalette);
  }, [theme]);


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

  if (loading || Object.keys(palette).length === 0) { // Also wait for palette to be ready
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
                <div key={day.date} className="bg-background p-5 rounded-lg border border-border flex items-center justify-between shadow-md transition-transform duration-200 hover:scale-[1.02]">
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
            <div className="bg-background p-6 rounded-lg border border-border h-64 md:h-96">
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
                  <CartesianGrid strokeDasharray="3 3" stroke={palette.border} />
                  <XAxis dataKey="date" stroke={palette.textSecondary} tickFormatter={(tick) => new Date(tick).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                  <YAxis stroke={palette.textSecondary} />
                  <Tooltip
                    contentStyle={{ backgroundColor: palette.surface, border: `1px solid ${palette.border}`, borderRadius: '8px' }}
                    labelStyle={{ color: palette.primary, fontWeight: 'bold' }}
                    itemStyle={{ color: palette.text }}
                    formatter={(value: number) => [`${value} kcal`, 'Calories']}
                  />
                  <Bar dataKey="totalCalories" fill={palette.primary} />
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
