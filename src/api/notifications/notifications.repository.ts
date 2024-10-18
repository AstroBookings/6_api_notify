import { PostgresRepository } from '@ab/data/postgres.repository';
import { Injectable, Logger } from '@nestjs/common';
import { CreateNotificationsDto } from './models/create-notification.dto';
import { NotificationDto } from './models/notification.dto';
import { NotificationStatus } from './models/notifications-status.enum';

/**
 * Repository for managing notifications in the postgres database
 */
@Injectable()
export class NotificationsRepository {
  readonly #logger = new Logger(NotificationsRepository.name);
  constructor(private readonly postgresRepository: PostgresRepository) {
    this.#logger.verbose('Initialized');
  }

  /**
   * Select notifications by status
   * @param {NotificationStatus} status - The status of the notifications to select
   * @returns {Promise<NotificationDto[]>} - An array of notification DTOs
   */
  async selectByStatus(status: NotificationStatus): Promise<NotificationDto[]> {
    const query = `SELECT * FROM notifications WHERE status = $1`;
    const result = await this.postgresRepository.query(query, [status]);
    return result.rows as NotificationDto[];
  }

  /**
   * Insert a new notification into the database
   * @param {CreateNotificationsDto} notification - The notification data transfer object
   * @returns {Promise<NotificationDto>} - The inserted notification DTO
   */
  async insert(notification: CreateNotificationsDto): Promise<NotificationDto> {
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
