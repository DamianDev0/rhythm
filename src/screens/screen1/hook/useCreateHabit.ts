import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useState } from 'react';
import { CreateHabitRequest } from '../../../../core/domain/entities/habit/request/createHabitRequest';
import { HabitController } from '../../../../core/infrastructure/controllers/habit.controller';
import { UserController } from '../../../../core/infrastructure/controllers/user.controller';
import { CustomToast } from '../../../components/toastComponent';

const useCreateHabit = () => {
  const token = useSelector((state: RootState) => state.token.token);
  const userId = useSelector((state: RootState) => state.token.userId);

  const [habitData, setHabitData] = useState({
    name: '',
    description: '',
    frequency: '',
    image: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setHabitData({
      ...habitData,
      [name]: value,
    });
  };

  const handleImageChange = (imageUri: string) => {
    setHabitData({
      ...habitData,
      image: imageUri,
    });
  };

  const handleSubmit = async () => {
    if (!token || !userId) {
      console.error('Token or User ID is missing');
      return;
    }

    try {
      const tokenValidationResponse = await UserController.ValidateToken(token);

      if (tokenValidationResponse.data) {
        const habitRequest: CreateHabitRequest = {
          ...habitData,
          userId: userId,
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
        });
      } else {
        console.error('Token is invalid');
      }
    } catch (error) {
      console.error('Error validating token or creating habit:', error);
    }
  };

  return {
    habitData,
    handleInputChange,
    handleImageChange,
    handleSubmit,
  };
};

export default useCreateHabit;
