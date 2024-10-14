import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';
import { NotificationsAbstractService } from './notifications.abstract.service';
import { NotificationsRepository } from './notifications.repository';

/**
 * Fake service for managing notifications
 * @description Used for development and testing
 */
@Injectable()
export class NotificationsFakeService extends NotificationsAbstractService {
  constructor(private readonly notificationsRepository: NotificationsRepository) {
    super();
  }

  /**
   * Get all pending notifications
   * @returns {Promise<NotificationDto[]>} - An array of notification DTOs
   */
  async getAllPending(): Promise<NotificationDto[]> {
    return this.notificationsRepository.selectByStatus('pending');
  }

  /**
   * Create new notifications based on a template event
   * @param {CreateNotificationDto} createNotification - The notification data transfer object
   * @returns {Promise<NotificationDto[]>} - An array of notification DTOs
   */
  async create(createNotification: CreateNotificationDto): Promise<NotificationDto[]> {
    // Gets template from templateId
    // Gets source and recipient from data
    // For each recipient:
    // - Fill subject and message from template
    // - Save notification
    // - Return notification array
    const notifications: NotificationDto[] = [];
    const notification: NotificationDto = {
      id: 'ntf_123',
      templateId: createNotification.templateId,
      userId: createNotification.userId,
      data: createNotification.data,
      recipient: 'john@example.com',
      message: 'Hello, John! Your booking bkn_123 is scheduled.',
      subject: 'Booking Scheduled',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
    };
    notifications.push(notification);

    for (const notification of notifications) {
      await this.notificationsRepository.insert(notification);
    }
    return notifications;
  }
}
