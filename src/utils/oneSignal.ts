import {LogLevel, OneSignal} from 'react-native-onesignal';

export const initializeOneSignal = async () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize('eae0142a-8b54-48b5-886d-493f595aeba7');
  OneSignal.Notifications.requestPermission(true);
};
