import {NotificationRequest} from '../../../core/domain/entities/notification/request/notificationRequest';
import {NotificationErrorResponse} from '../../../core/domain/entities/notification/response/notificationErrorResponse';
import {NotificationResponse} from '../../../core/domain/entities/notification/response/notificationResponse';
import apiUrl from '../api/apiUrl';

const notificationService = {
  async sendMessageService(
    data: NotificationRequest,
  ): Promise<NotificationResponse | NotificationErrorResponse> {
    try {
      const response = await apiUrl.post<NotificationResponse>(
        'notifications/send',
        data,
      );
      return response.data;
    } catch (error) {
      return error as NotificationErrorResponse;
    }
  },
};

export default notificationService;
