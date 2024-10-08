import { CreateNotificationDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';

/**
 * Abstract service for managing notifications
 */
export abstract class NotificationsService {
  abstract getAllPending(): Promise<NotificationDto[]>;
  abstract create(notification: CreateNotificationDto): Promise<NotificationDto[]>;
}
