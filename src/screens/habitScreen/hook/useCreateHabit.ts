import {useState} from 'react';

import {useSelector} from 'react-redux';

import {CreateHabitRequest} from '../../../../core/domain/entities/habit/request/createHabitRequest';
import {HabitController} from '../../../../core/infrastructure/controllers/habit.controller';
import {UserController} from '../../../../core/infrastructure/controllers/user.controller';
import {CustomToast} from '../../../components/toastComponent';
import {RootState} from '../../../redux/store';

const useCreateHabit = () => {
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.token.userId);

  const [habitData, setHabitData] = useState({
    name: '',
    description: '',
    frequency: '',
    image: '',
    time: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setHabitData({
      ...habitData,
      [name]: value,
    });
  };

  const handleFrequencyChange = (value: string | null) => {
    setHabitData({
      ...habitData,
      frequency: value || '',
    });
  };

  const handleImageChange = (imageUri: string) => {
    setHabitData({
      ...habitData,
      image: imageUri,
    });
  };

  const handleTimeChange = (selectedTime: Date) => {
    const formattedTime = selectedTime.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    setHabitData({
      ...habitData,
      time: formattedTime,
    });
  };

  const handleSubmit = async () => {
    if (!token || !userId) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Token or User ID is missing.',
        position: 'top',
      });
      return;
    }

    if (
      !habitData.name ||
      !habitData.description ||
      !habitData.frequency ||
      !habitData.image ||
      !habitData.time
    ) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required.',
        position: 'top',
      });
      return;
    }

    try {
      const tokenValidationResponse = await UserController.ValidateToken(token);

      if (tokenValidationResponse.data) {
        const habitRequest: CreateHabitRequest = {
          ...habitData,
          userId: userId,
          streak: 0,
          lastCompleted: '',
        };

        await HabitController.CreateHabit(habitRequest);
        CustomToast({
          type: 'success',
          text1: 'Success',
          text2: 'Habit created successfully.',
          position: 'top',
        });

        setHabitData({
          name: '',
          description: '',
          frequency: '',
          image: '',
          time: '',
        });
      } else {
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: 'Token is invalid.',
          position: 'top',
        });
      }
    } catch (error) {
      CustomToast({
        type: 'error',
        text1: 'Error',
        text2: 'Error validating token or creating habit.',
        position: 'top',
      });
    }
  };

  return {
    habitData,
    handleInputChange,
    handleFrequencyChange,
    handleImageChange,
    handleSubmit,
    handleTimeChange,
  };
};

export default useCreateHabit;
