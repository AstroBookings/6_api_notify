import { Module } from '@nestjs/common';
import { NotificationsFakeService } from './notifications-fake.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

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
