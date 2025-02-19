import { useSelector } from 'react-redux';

import { NotificationRequest } from '../../../../core/domain/entities/notification/request/notificationRequest';
import { NotificationController } from '../../../../core/infrastructure/controllers/notification.controller';
import { RootState } from '../../../redux/store';

const useScheduleNotification = () => {
  const oneSignalPlayerId = useSelector((state: RootState) => state.token.oneSignalPlayerId);

  const scheduleNotification = async (title: string, time: string) => {
    if (!title || !time || !oneSignalPlayerId) {
      console.warn('Skipping notification: Missing required parameters.');
      return;
    }

    try {
      const notificationData: NotificationRequest = {
        title: `Reminder: ${title} ⏰`,
        message: `It's time to complete your habit: ${title}`,
        oneSignalIds: [oneSignalPlayerId],
        scheduleOptions: {
          delayedOption: 'timezone',
          deliveryTimeOfDay: time,
        },
      };

      await NotificationController.SendMessage(notificationData);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return { scheduleNotification };
};

export default useScheduleNotification;
