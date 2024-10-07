import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';
import { NotificationsService } from './notifications.service';

/**
 * Fake in-memory implementation of NotificationsService
 */
@Injectable()
export class NotificationsFakeService extends NotificationsService {
  /**
   * Get all pending notifications
   * @returns {NotificationDto[]} - An array of notification DTOs
   */
  async getAllPending(): Promise<NotificationDto[]> {
    return [
      {
        id: 'ntf_123',
        templateId: 'tpl_123',
        userId: 'usr_123',
        data: '{"bookingId": "bkn_123"}',
        message: 'Hello, John! Your booking bkn_123 is scheduled.',
        subject: 'Booking Scheduled',
        createdAt: new Date(),
        updatedAt: new Date(),
        recipient: 'john@example.com',
        status: 'pending',
      },
      {
        id: 'ntf_456',
        templateId: 'tpl_234',
        userId: 'usr_456',
        data: '{"launchId": "lnc_456"}',
        message: 'Hello, Jane! Your launch lnc_456 is delayed.',
        subject: 'Launch delayed',
        createdAt: new Date(),
        updatedAt: new Date(),
        recipient: 'jane@example.com',
        status: 'pending',
      },
      {
        id: 'ntf_789',
        templateId: 'tpl_234',
        userId: 'usr_789',
        data: '{"launchId": "lnc_456"}',
        message: 'Hello, Paul! Your launch lnc_789 is delayed.',
        subject: 'Launch delayed',
        createdAt: new Date(),
        updatedAt: new Date(),
        recipient: 'paul@example.com',
        status: 'pending',
      },
    ];
  }

  /**
   * Create a new notification
   * @param {CreateNotificationDto} notification - The notification data transfer object
   * @returns {NotificationDto[]} - An array of notification DTOs
   */
  async create(notification: CreateNotificationDto): Promise<NotificationDto[]> {
    // Gets template from templateId
    // Gets source and recipient from data
    // For each recipient:
    // - Fill subject and message from template
    // - Save notification
    // - Return notification array
    return [
      {
        id: 'ntf_123',
        templateId: notification.templateId,
        userId: notification.userId,
        data: notification.data,
        message: 'Hello, John! Your booking bkn_123 is scheduled.',
        subject: 'Booking Scheduled',
        createdAt: new Date(),
        updatedAt: new Date(),
        recipient: 'john@example.com',
        status: 'pending',
      },
    ];
  }
}
