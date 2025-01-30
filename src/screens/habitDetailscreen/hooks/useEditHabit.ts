/* eslint-disable no-catch-shadow */
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CustomToast} from '../../../components/toastComponent';
import {RootState} from '../../../redux/store';
import {HabitController} from '../../../../core/infrastructure/controllers/habit.controller';
import {setToken} from '../../../redux/tokenSlice';
import {UserController} from '../../../../core/infrastructure/controllers/user.controller';
import {CreateHabitRequest} from '../../../../core/domain/entities/habit/request/createHabitRequest';
import useNavigation from '../../../hook/useNavigation';

export const useEditHabit = (
  habitId: number,
  habitData: {name: string; description: string; frequency: string},
) => {
  const dispatch = useDispatch();
  const {token} = useSelector((state: RootState) => state.token);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [habit, setHabit] = useState({
    name: habitData.name,
    description: habitData.description,
    frequency: habitData.frequency || null,
  });

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleEditHabit = async () => {
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

      const updatedData: Partial<CreateHabitRequest> = {
        name: habit.name,
        description: habit.description || '',
        frequency: habit.frequency || '',
      };

      const result = await HabitController.EditHabit(habitId, updatedData);
      if (result) {
        CustomToast({
          type: 'success',
          text1: 'Habit updated',
          text2: 'The habit was successfully updated',
          position: 'top',
        });

        navigation.navigate('Home');

        setModalVisible(false);
      } else {
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update the habit',
        });
      }
    } catch (error) {
      setError('There was an issue updating the habit');
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'There was an issue updating the habit',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return {
    habit,
    setHabit,
    handleEditHabit,
    modalVisible,
    toggleModal,
    loading,
    error,
  };
};
