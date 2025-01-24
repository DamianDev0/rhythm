import {useState, useEffect} from 'react';
import moment from 'moment';
import {HabitController} from '../../../../core/infrastructure/controllers/habit.controller';
import {CustomToast} from '../../../components/toastComponent';

interface StreakLogicProps {
  habitId: number;
  initialStreak: number;
  initialLastCompleted: string;
}

interface MarkedDates {
  [date: string]: {selected: boolean; selectedColor: string};
}

const useStreakLogic = ({
  habitId,
  initialStreak,
  initialLastCompleted,
}: StreakLogicProps) => {
  const [streak, setStreak] = useState(initialStreak);
  const [lastCompleted, setLastCompleted] = useState(initialLastCompleted);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const markDayAsCompleted = async (date: string) => {
    const today = moment().format('YYYY-MM-DD');
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');

    if (markedDates[date]) {
      CustomToast({
        type: 'info',
        text1: 'Day already completed',
        text2: 'You cannot mark the same day more than once.',
      });
      return;
    }

    let newStreak = streak;

    if (lastCompleted === yesterday || lastCompleted === today) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    try {
      await HabitController.UpdateHabitStreak(habitId, newStreak, date);
      setStreak(newStreak);
      setLastCompleted(date);

      setMarkedDates(prevDates => ({
        ...prevDates,
        [date]: {selected: true, selectedColor: '#4CAF50'},
      }));

      CustomToast({
        type: 'success',
        text1: 'Day completed',
        text2: `Current streak: ${newStreak} day${newStreak !== 1 ? 's' : ''}!`,
      });
    } catch (error) {
      console.error('Error marking day as completed:', error);

      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to mark the day as completed.',
      });
    }
  };

  useEffect(() => {
    if (lastCompleted) {
      setMarkedDates({
        [lastCompleted]: {selected: true, selectedColor: '#4CAF50'},
      });
    }
  }, [lastCompleted]);

  return {streak, markedDates, markDayAsCompleted};
};

export default useStreakLogic;
