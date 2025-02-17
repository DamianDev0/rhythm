import {useState} from 'react';

import {Alert, PermissionsAndroid, Platform} from 'react-native';
import RNFS from 'react-native-fs';
import {useSelector} from 'react-redux';

import {Habit} from '../../../../core/domain/entities/habit/Habit';
import {HabitController} from '../../../../core/infrastructure/controllers/habit.controller';
import {CustomToast} from '../../../components/toastComponent';
import {RootState} from '../../../redux/store';

const useExportHabits = () => {
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state: RootState) => state.token.userId);

  const folderPath =
    Platform.OS === 'android'
      ? `${RNFS.DownloadDirectoryPath}/RhythmApp`
      : `${RNFS.DocumentDirectoryPath}/RhythmApp`;

  const filePath = `${folderPath}/habits_backup.json`;

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 30) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Error requesting permissions:', err);
        return false;
      }
    }
    return true;
  };

  const exportHabits = async () => {
    try {
      setLoading(true);

      if (!userId) {
        Alert.alert('Error', 'User not found.');
        return;
      }

      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Access to Downloads is required.');
        setLoading(false);
        return;
      }

      const folderExists = await RNFS.exists(folderPath);
      if (!folderExists) {
        await RNFS.mkdir(folderPath);
      }

      const habits: Habit[] = await HabitController.GetAllHabits(userId);

      if (habits.length === 0) {
        CustomToast({
          type: 'error',
          text1: 'Error',
          text2: 'There are no habits to export',
        });
        setLoading(false);
        return;
      }

      const jsonContent = JSON.stringify(habits, null, 2);
      await RNFS.writeFile(filePath, jsonContent, 'utf8');

      await RNFS.readFile(filePath, 'utf8');

      CustomToast({
        type: 'success',
        text1: 'Export Successful',
        text2: 'File saved at:\n${filePath}',
      });

      console.log('saved the habits in' , filePath)

    } catch (error) {
      console.error('Error exporting habits:', error);
      Alert.alert('Error', 'Could not export habits.');
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return {exportHabits, loading, filePath};
};

export default useExportHabits;
