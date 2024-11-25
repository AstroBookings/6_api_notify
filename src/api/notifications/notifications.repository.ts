import { PostgresRepository } from '@ab/data/postgres.repository';
import { Injectable, Logger } from '@nestjs/common';
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
   * Select a notification by id
   * @param {string} id - The id of the notification
   * @returns {Promise<NotificationDto>} - The notification DTO
   */
  async selectById(id: string): Promise<NotificationDto> {
    const query = `SELECT * FROM notifications WHERE id = $1`;
    const result = await this.postgresRepository.query(query, [id]);
    return result.rows[0] as NotificationDto;
  }

  /**
   * Insert a new notification into the database
   * @param {NotificationDto} notification - The notification data transfer object
   * @returns {Promise<NotificationDto>} - The inserted notification DTO
   */
  async insert(notification: NotificationDto): Promise<NotificationDto> {
    const query = `INSERT INTO notifications 
    (id, template_id, user_id, data, recipient, subject, message, status)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
    const result = await this.postgresRepository.query(query, [
      notification.id,
      notification.templateId,
      notification.userId,
      notification.data,
      notification.recipient,
      notification.subject,
      notification.message,
      notification.status,
    ]);
    return result.rows[0] as NotificationDto;
  }
}
