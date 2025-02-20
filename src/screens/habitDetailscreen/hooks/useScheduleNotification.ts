import moment from 'moment';
import {useSelector} from 'react-redux';

import {NotificationRequest} from '../../../../core/domain/entities/notification/request/notificationRequest';
import {NotificationController} from '../../../../core/infrastructure/controllers/notification.controller';
import {RootState} from '../../../redux/store';

const useScheduleNotification = () => {
  const oneSignalPlayerId = useSelector(
    (state: RootState) => state.token.oneSignalPlayerId,
  );

  const scheduleNotification = async (
    title: string,
    time: string,
    frequency: string,
  ) => {
    if (!title || !time || !oneSignalPlayerId) {
      console.warn('Skipping notification: Missing required parameters.');
      return;
    }

    try {
      let scheduleOptions = {};

      if (frequency === 'daily') {
        const formattedTime = moment(time, 'HH:mm').format('HH:mm');

        scheduleOptions = {
          delayedOption: 'timezone',
          deliveryTimeOfDay: formattedTime,
        };
      } else if (['weekly', 'biweekly', 'monthly'].includes(frequency)) {
        const daysToAdd =
          frequency === 'weekly' ? 7 : frequency === 'biweekly' ? 15 : 30;

        const scheduledDate = moment()
          .add(daysToAdd, 'days')
          .format('YYYY-MM-DD');
        const sendAfter = moment(`${scheduledDate} ${time}`, 'YYYY-MM-DD HH:mm')
          .utc()
          .format();

        scheduleOptions = {sendAfter};
      } else {
        console.warn('Skipping notification: Invalid frequency.');
        return;
      }

      const notificationData: NotificationRequest = {
        title: `Reminder: ${title} ⏰`,
        message: `It's time to complete your habit: ${title}`,
        oneSignalIds: [oneSignalPlayerId],
        scheduleOptions,
      };

      await NotificationController.SendMessage(notificationData);
    } catch (error) {
      console.error(' Error sending notification:', error);
    }
  };

  return {scheduleNotification};
};

export default useScheduleNotification;
