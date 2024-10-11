import { Module } from '@nestjs/common';
import { PostgresRepository } from 'src/shared/data/postgres.repository';
import { NotificationsAbstractService } from './notifications.abstract.service';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsService } from './notifications.service';

/**
 * Module for handling notifications
 */
@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: NotificationsAbstractService,
      useClass: NotificationsService,
    },
    NotificationsRepository,
    PostgresRepository,
  ],
})
export class NotificationsModule {}
