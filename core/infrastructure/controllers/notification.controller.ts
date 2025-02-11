import {sendMessage} from '../../application/useCases/notificationUseCases';
import {NotificationRequest} from '../../domain/entities/notification/request/notificationRequest';
import {NotificationErrorResponse} from '../../domain/entities/notification/response/notificationErrorResponse';
import {NotificationResponse} from '../../domain/entities/notification/response/notificationResponse';
import {NotificationRepositoryImp} from '../repositories/notification.repositoryImp';

const notificationRepository = new NotificationRepositoryImp();

export class NotificationController {
  static async SendMessage(
    data: NotificationRequest,
  ): Promise<NotificationResponse | NotificationErrorResponse> {
    try {
      const response = await sendMessage(notificationRepository, data);
      return response;
    } catch (error) {
      return error as NotificationErrorResponse;
    }
  }
}
