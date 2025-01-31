import { useState, useEffect } from 'react';

import moment from 'moment';

import { HabitController } from '../../../../core/infrastructure/controllers/habit.controller';
import { CustomToast } from '../../../components/toastComponent';

interface StreakLogicProps {
  habitId: number;
  initialStreak: number;
  initialLastCompleted: string;
}

interface MarkedDates {
  [date: string]: { selected: boolean; selectedColor: string };
}

const useStreakLogic = ({ habitId, initialStreak, initialLastCompleted }: StreakLogicProps) => {
  const [streak, setStreak] = useState(initialStreak);
  const [lastCompleted, setLastCompleted] = useState(initialLastCompleted);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [lastMarkedDay, setLastMarkedDay] = useState<string | null>(null);

  const markDayAsCompleted = async (date: string) => {
    const today = moment().format('YYYY-MM-DD');
    const nextDay = moment(lastCompleted).add(1, 'days').format('YYYY-MM-DD');

    if (moment(date).isBefore(today)) {
      CustomToast({
        type: 'error',
        text1: 'Invalid Selection',
        text2: 'You cannot mark past days.',
      });
      return;
    }

    if (date !== today && date !== nextDay) {
      CustomToast({
        type: 'error',
        text1: 'Invalid Selection',
        text2: 'You can only mark today or the next consecutive day.',
      });
      return;
    }

    if (lastMarkedDay === today) {
      CustomToast({
        type: 'info',
        text1: 'Already marked',
        text2: 'You cannot mark more than one habit per day.',
      });
      return;
    }

    let newStreak = streak;
    if (lastCompleted === moment().subtract(1, 'days').format('YYYY-MM-DD')) {
      newStreak += 1;
    } else {
      newStreak = 1;
    }

    try {
      await HabitController.UpdateHabitStreak(habitId, newStreak, date);
      setStreak(newStreak);
      setLastCompleted(date);
      setLastMarkedDay(today);
      setMarkedDates(prevDates => ({
        ...prevDates,
        [date]: { selected: true, selectedColor: '#000' },
      }));

      CustomToast({
        type: 'success',
        text1: 'Day completed',
        text2: `Current streak: ${newStreak} day${newStreak !== 1 ? 's' : ''}!`,
      });
    } catch (error) {
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
        [lastCompleted]: { selected: true, selectedColor: '#000' },
      });
    }
  }, [lastCompleted]);

  return { streak, markedDates, markDayAsCompleted };
};

export default useStreakLogic;
