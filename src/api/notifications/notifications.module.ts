import { PostgresModule } from '@ab/data/postgres.module';
import { Module } from '@nestjs/common';
import { NotificationsFakeService } from './notifications-fake.service';
import { NotificationsAbstractService } from './notifications.abstract.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';

/**
 * Module for handling notifications
 * uses IoC to inject the NotificationsAbstractService implementation
 */
@Module({
  imports: [PostgresModule],
  controllers: [NotificationsController],
  providers: [
    {
      provide: NotificationsAbstractService,
      useClass: NotificationsFakeService,
    },
    NotificationsRepository,
  ],
})
export class NotificationsModule {}
