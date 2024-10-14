import { Module } from '@nestjs/common';
import { PostgresModule } from 'src/shared/data/postgres.module';
import { NotificationsFakeService } from './notifications-fake.service';
import { NotificationsAbstractService } from './notifications.abstract.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';

/**
 * Module for handling notifications
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
