import { useState } from 'react';

import { pick } from '@react-native-documents/picker';
import { Alert } from 'react-native';
import RNFS from 'react-native-fs';
import { useSelector } from 'react-redux';

import { HabitController } from '../../../../core/infrastructure/controllers/habit.controller';
import { CustomToast } from '../../../components/toastComponent';
import { RootState } from '../../../redux/store';

const useImportHabits = () => {
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state: RootState) => state.token.userId);

  const importHabits = async () => {
    try {
      setLoading(true);

      if (!userId) {
        Alert.alert('Error', 'User not found.');
        return;
      }

      const [pickResult] = await pick({
        mode: 'import',
        type: ['application/json'],
      });

      if (!pickResult || !pickResult.uri) {
        CustomToast({
          type: 'error',
          text1: 'No File Selected',
          text2: 'Please select a valid JSON file.',
        });
        return;
      }

      const fileContent = await RNFS.readFile(pickResult.uri, 'utf8');

      const importedHabits = JSON.parse(fileContent);

      if (!Array.isArray(importedHabits) || importedHabits.length === 0) {
        CustomToast({
          type: 'error',
          text1: 'Invalid File',
          text2: 'The file does not contain valid habits.',
        });
        return;
      }

      for (const habit of importedHabits) {
        await HabitController.CreateHabit({
          userId,
          name: habit.name,
          description: habit.description,
          image: habit.image || '',
          frequency: habit.frequency || 'daily',
          streak: habit.streak || 0,
          lastCompleted: habit.lastCompleted || null,
        });
      }

      CustomToast({
        type: 'success',
        text1: 'Import Successful',
        text2: `${importedHabits.length} habits imported successfully.`,
      });
    } catch (error) {
      console.error('Error importing habits:', error);
    } finally {
      setLoading(false);
    }
  };

  return { importHabits, loading };
};

export default useImportHabits;
