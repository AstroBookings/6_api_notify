import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNotificationsDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';
import { NotificationsAbstractService } from './notifications.abstract.service';

/**
 * Controller for handling notifications
 * @requires NotificationsService to manage notifications
 */
@Controller('api/notifications')
@ApiTags('notifications')
export class NotificationsController {
  readonly #logger = new Logger(NotificationsController.name);
  constructor(private readonly notificationsService: NotificationsAbstractService) {
    this.#logger.verbose('Initialized');
  }

  @Get('ping')
  @ApiOperation({ summary: 'Ping the notifications endpoint' })
  @ApiOkResponse({ status: 200, description: 'Returns pong' })
  ping(): string {
    return 'pong';
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications not sent yet' })
  @ApiOkResponse({
    description: 'The array of notifications not sent yet',
    isArray: true,
    type: NotificationDto,
  })
  async getAllPending(): Promise<NotificationDto[]> {
    return this.notificationsService.getAllPending();
  }

  @Post()
  @ApiOperation({ summary: 'Create new notifications for an event' })
  @ApiBody({ type: CreateNotificationsDto })
  @ApiCreatedResponse({
    description: 'The array of created notifications',
    isArray: true,
    type: NotificationDto,
  })
  async create(@Body() createNotification: CreateNotificationsDto): Promise<NotificationDto[]> {
    return this.notificationsService.create(createNotification);
  }
}
