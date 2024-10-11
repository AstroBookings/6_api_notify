import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';
import { NotificationsAbstractService } from './notifications.abstract.service';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService extends NotificationsAbstractService {
  constructor(private readonly notificationsRepository: NotificationsRepository) {
    super();
  }

  async getAllPending(): Promise<NotificationDto[]> {
    return this.notificationsRepository.selectByStatus('pending');
  }

  async create(createNotification: CreateNotificationDto): Promise<NotificationDto[]> {
    // Gets template from templateId
    // Gets source and recipient from data
    // For each recipient:
    // - Fill subject and message from template
    // - Save notification
    // - Return notification array
    const notifications: NotificationDto[] = [];
    for (const notification of notifications) {
      await this.notificationsRepository.insert(notification);
    }
    return notifications;
  }
}
