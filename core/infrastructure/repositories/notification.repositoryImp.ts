import notificationService from '../../../src/utils/service/notificationService';
import {NotificationRequest} from '../../domain/entities/notification/request/notificationRequest';
import {NotificationErrorResponse} from '../../domain/entities/notification/response/notificationErrorResponse';
import {NotificationResponse} from '../../domain/entities/notification/response/notificationResponse';
import {NotificationRepository} from '../../domain/interfaces/notification.repository';

export class NotificationRepositoryImp implements NotificationRepository {
  async sendMessage(
    data: NotificationRequest,
  ): Promise<NotificationResponse | NotificationErrorResponse> {
    try {
      return await notificationService.sendMessageService(data);
    } catch (error) {
      return error as NotificationErrorResponse;
    }
  }
}
