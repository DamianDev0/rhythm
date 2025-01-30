/* eslint-disable @typescript-eslint/no-shadow */
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {UserController} from '../../../../core/infrastructure/controllers/user.controller';
import {CustomToast} from '../../../components/toastComponent';
import {RootState} from '../../../redux/store';
import {HabitController} from '../../../../core/infrastructure/controllers/habit.controller';
import {setToken} from '../../../redux/tokenSlice';
import useNavigation from '../../../hook/useNavigation';

export const useDeleteHabit = () => {
  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.token);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleDeleteHabit = async (habitId: number) => {
    if (!token) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'No authentication token found',
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const isValid = await UserController.ValidateToken(token);
      if (!isValid) {
        CustomToast({
          type: 'error',
          text1: 'Invalid token',
          text2: 'Please log in again',
        });
        dispatch(setToken({token: '', userId: ''}));
        return;
      }

      const result = await HabitController.DeleteHabit(habitId);
      if (result) {
        CustomToast({
          type: 'success',
          text1: 'Habit deleted',
          text2: 'The habit was successfully deleted',
          position: 'top',
        });
        navigation.navigate('Home');
      } else {
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to delete the habit',
        });
      }
    } catch (error) {
      setError('There was an issue deleting the habit');
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'There was an issue deleting the habit',
      });
    } finally {
      setLoading(false);
    }
  };

  return {handleDeleteHabit, loading, error};
};
