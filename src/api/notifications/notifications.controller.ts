import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';
import { NotificationsService } from './notifications.service';

/**
 * Controller for handling notifications
 * @requires NotificationsService to manage notifications
 */
@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  /**
   * Get all pending notifications
   */
  @Get()
  getAllPending(): NotificationDto[] {
    return this.notificationsService.getAllPending();
  }

  /**
   * Create a new notification
   * @param createNotification - The notification to create
   * @returns The created notification
   */
  @Post()
  create(@Body() createNotification: CreateNotificationDto) {
    return this.notificationsService.create(createNotification);
  }
}
