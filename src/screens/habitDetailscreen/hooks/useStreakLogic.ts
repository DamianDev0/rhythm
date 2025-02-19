import {useState, useEffect} from 'react';

import moment from 'moment';

import {HabitController} from '../../../../core/infrastructure/controllers/habit.controller';
import {CustomToast} from '../../../components/toastComponent';

interface StreakLogicProps {
  habitId: number;
  initialStreak: number;
  initialLastCompleted: string;
  frequency: string;
}

interface MarkedDates {
  [date: string]: {
    color: string;
    textColor: string;
    startingDay?: boolean;
    endingDay?: boolean;
  };
}

const useStreakLogic = ({
  habitId,
  initialStreak,
  initialLastCompleted,
  frequency,
}: StreakLogicProps) => {
  const [streak, setStreak] = useState(initialStreak);
  const [lastCompleted, setLastCompleted] = useState(initialLastCompleted);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  useEffect(() => {
    if (lastCompleted) {
      updateMarkedDates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastCompleted]);

  const getNextValidDate = (date: string) => {
    switch (frequency) {
      case 'daily':
        return moment(date).add(1, 'days').format('YYYY-MM-DD');
      case 'weekly':
        return moment(date).add(1, 'weeks').format('YYYY-MM-DD');
      case 'biweekly':
        return moment(date).add(15, 'days').format('YYYY-MM-DD');
      case 'monthly':
        return moment(date).add(1, 'months').format('YYYY-MM-DD');
      default:
        return moment(date).add(1, 'days').format('YYYY-MM-DD');
    }
  };

  const markDayAsCompleted = async (date: string) => {
    const today = moment().format('YYYY-MM-DD');
    const lastStreakDay = moment(lastCompleted).format('YYYY-MM-DD');
    const nextValidDay = getNextValidDate(lastCompleted);

    if (moment(date).isAfter(today)) {
      CustomToast({
        type: 'error',
        text1: 'Invalid Selection',
        text2: 'You cannot mark future dates.',
      });
      return;
    }

    if (moment(date).isBefore(lastCompleted)) {
      CustomToast({
        type: 'error',
        text1: 'Invalid Selection',
        text2: 'You cannot mark past dates.',
      });
      return;
    }

    let newStreak = streak;

    if (date === today || date === nextValidDay) {
      if (date === nextValidDay) {
        newStreak += 1;
      } else if (date !== lastStreakDay) {
        newStreak = 1;
      }

      try {
        await HabitController.UpdateHabitStreak(habitId, newStreak, date);
        setStreak(newStreak);
        setLastCompleted(date);
        updateMarkedDates(date);

        CustomToast({
          type: 'success',
          text1: 'Day Completed',
          text2: `Current streak: ${newStreak} day${
            newStreak !== 1 ? 's' : ''
          }!`,
        });
      } catch (error) {
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to mark the day as completed.',
        });
      }
    } else {
      CustomToast({
        type: 'error',
        text1: 'Invalid Selection',
        text2: 'You can only mark today or the next consecutive day.',
      });
    }
  };

  const updateMarkedDates = (newDate?: string) => {
    let updatedDates: MarkedDates = {};
    let startDate = moment(initialLastCompleted);
    const today = moment();
    const futureDays = 30;


    for (let i = 0; i <= futureDays; i++) {
      const dateStr = startDate.format('YYYY-MM-DD');
      updatedDates[dateStr] = {
        color: '#a9dfbf',
        textColor: '#000',
        startingDay: startDate.isSame(moment(initialLastCompleted), 'day'),
        endingDay: startDate.isSame(today, 'day'),
      };

      const nextDateStr = getNextValidDate(startDate.format('YYYY-MM-DD'));
      startDate = moment(nextDateStr);
    }


    if (newDate) {
      updatedDates[newDate] = {
        startingDay: Object.keys(updatedDates).length === 0,
        endingDay: true,
        color: '#a9dfbf',
        textColor: '#000',
      };
    }

    setMarkedDates(updatedDates);
  };

  return {streak, markedDates, markDayAsCompleted};
};

export default useStreakLogic;
