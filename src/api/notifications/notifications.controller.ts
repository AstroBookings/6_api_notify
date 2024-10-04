import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';
import { NotificationsService } from './notifications.service';

/**
 * Controller for handling notifications
 * @requires NotificationsService to manage notifications
 */
@ApiTags('notifications')
@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all notifications not sent yet' })
  @ApiResponse({
    status: 200,
    description: 'The array of notifications not sent yet',
    type: [NotificationDto],
  })
  getAllPending(): NotificationDto[] {
    return this.notificationsService.getAllPending();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiBody({ type: CreateNotificationDto })
  @ApiResponse({
    status: 201,
    description: 'The array of created notifications',
    isArray: true,
    type: NotificationDto,
  })
  create(@Body() createNotification: CreateNotificationDto) {
    return this.notificationsService.create(createNotification);
  }
}
