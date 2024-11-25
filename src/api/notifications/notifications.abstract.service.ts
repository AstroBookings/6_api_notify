import { CreateNotificationsDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';

/**
 * Abstract service for managing notifications
 */
export abstract class NotificationsAbstractService {
  abstract getAllPending(): Promise<NotificationDto[]>;
  abstract getById(id: string): Promise<NotificationDto>;
  abstract create(notification: CreateNotificationsDto): Promise<NotificationDto[]>;
}
