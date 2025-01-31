import {useState} from 'react';
import {HabitStatistics} from '../../../../core/domain/entities/habit/request/HabitStatistics';
import {HabitController} from '../../../../core/infrastructure/controllers/habit.controller';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

export const useHabitStatistics = () => {
  const userId = useSelector((state: RootState) => state.token.userId);
  const [stats, setStats] = useState<HabitStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      if (!userId) {
        return;
      }
      const data = await HabitController.GetStastHabit(userId);
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return {stats, loading, fetchStats};
};
