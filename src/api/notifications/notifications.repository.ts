import { Injectable } from '@nestjs/common';
import { PostgresRepository } from 'src/shared/data/postgres.repository';
import { CreateNotificationDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';
import { NotificationStatus } from './models/notifications-status.enum';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly postgresRepository: PostgresRepository) {}

  async selectByStatus(status: NotificationStatus): Promise<NotificationDto[]> {
    const query = `SELECT * FROM notifications WHERE status = $1`;
    const result = await this.postgresRepository.query(query, [status]);
    return result.rows as NotificationDto[];
  }

  async insert(notification: CreateNotificationDto): Promise<NotificationDto> {
    const query = `INSERT INTO notifications (template_id, user_id, data, status) VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await this.postgresRepository.query(query, [
      notification.templateId,
      notification.userId,
      notification.data,
      'pending',
    ]);
    return result.rows[0] as NotificationDto;
  }
}
