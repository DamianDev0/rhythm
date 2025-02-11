import {NotificationRequest} from '../entities/notification/request/notificationRequest';
import {NotificationErrorResponse} from '../entities/notification/response/notificationErrorResponse';
import {NotificationResponse} from '../entities/notification/response/notificationResponse';

export interface NotificationRepository {
  sendMessage(
    data: NotificationRequest,
  ): Promise<NotificationResponse | NotificationErrorResponse>;
}
