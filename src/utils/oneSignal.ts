import {LogLevel, OneSignal} from 'react-native-onesignal';

import {store} from '../redux/store';
import {setOneSignalPlayerId} from '../redux/tokenSlice';

export const initializeOneSignal = () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize('eae0142a-8b54-48b5-886d-493f595aeba7');
  OneSignal.Notifications.requestPermission(true);

  const updateOneSignalId = async () => {
    try {
      const onesignalId = await OneSignal.User.getOnesignalId();
      if (onesignalId) {
        store.dispatch(setOneSignalPlayerId(onesignalId));
        console.log(`OneSignal ID saved in Redux: ${onesignalId}`);
      } else {
        console.warn('Unable to retrieve OneSignal ID.');
      }
    } catch (error) {
      console.error('Error fetching OneSignal ID:', error);
    }
  };

  OneSignal.User.addEventListener('change', updateOneSignalId);

  updateOneSignalId();
};
