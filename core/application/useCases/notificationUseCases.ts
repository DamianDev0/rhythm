import {NotificationRequest} from '../../domain/entities/notification/request/notificationRequest';
import {NotificationRepository} from '../../domain/interfaces/notification.repository';

export const sendMessage = (
  notificationRepository: NotificationRepository,
  data: NotificationRequest,
) => {
  return notificationRepository.sendMessage(data);
};
