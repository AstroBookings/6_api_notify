import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';
import { NotificationsAbstractService } from './notifications.abstract.service';

/**
 * Controller for handling notifications
 * @requires NotificationsService to manage notifications
 */
@ApiTags('notifications')
@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsAbstractService) {}

  @Get('ping')
  @ApiOperation({ summary: 'Ping the notifications endpoint' })
  @ApiResponse({ status: 200, description: 'Returns pong' })
  ping(): string {
    return 'pong';
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications not sent yet' })
  @ApiResponse({
    status: 200,
    description: 'The array of notifications not sent yet',
    type: [NotificationDto],
  })
  async getAllPending(): Promise<NotificationDto[]> {
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
  async create(@Body() createNotification: CreateNotificationDto): Promise<NotificationDto[]> {
    return this.notificationsService.create(createNotification);
  }
}
