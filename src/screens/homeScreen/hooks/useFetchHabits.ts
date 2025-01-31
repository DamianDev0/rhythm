/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import {useEffect, useState, useCallback} from 'react';

import {useSelector} from 'react-redux';

import {Habit} from '../../../../core/domain/entities/habit/Habit';
import {HabitController} from '../../../../core/infrastructure/controllers/habit.controller';
import {UserController} from '../../../../core/infrastructure/controllers/user.controller';
import {RootState} from '../../../redux/store';

const useFetchHabits = () => {
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.token.userId);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = useCallback(async () => {
    if (!token || !userId) {
      setError('Token or User ID is missing');
      setLoading(false);
      return;
    }

    try {
      const tokenValidationResponse = await UserController.ValidateToken(token);

      if (tokenValidationResponse.data) {
        const fetchedHabits = await HabitController.GetAllHabits(userId);
        setHabits(fetchedHabits);
      } else {
        setError('Token is invalid');
      }
    } catch (error) {
      setError('Failed to fetch habits');
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  return {habits, loading, error, fetchHabits};
};

export default useFetchHabits;
