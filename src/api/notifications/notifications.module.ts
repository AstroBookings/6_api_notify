import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsFakeService, NotificationsService } from './notifications.service';

/**
 * Module for handling notifications
 */
@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: NotificationsService,
      useClass: NotificationsFakeService,
    },
  ],
})
export class NotificationsModule {}
