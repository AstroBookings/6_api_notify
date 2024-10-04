import { NotificationStatus } from './notifications-status.enum';

/**
 * Data transfer object for a notification
 */
export class NotificationDto {
  /**
   * The unique identifier for the notification
   * @example 'ntf_123'
   */
  id: string;

  /**
   * The unique identifier for the template used to create the notification
   * @example 'tpl_123'
   */
  templateId: string;

  /**
   * The unique identifier for the user who will receive the notification
   * @example 'usr_123'
   */
  userId: string;

  /**
   * The data associated with the notification
   * @example '{"bookingId": "bkn_123"}'
   */
  data: string;

  /**
   * The recipient of the notification
   * @example 'john@example.com'
   */
  recipient: string;

  /**
   * The subject of the notification
   * @example 'Booking Scheduled'
   */
  subject: string;

  /**
   * The message of the notification
   * @example 'Hello, John! Your booking bkn_123 is scheduled.'
   */
  message: string;

  /**
   * The status of the notification
   * @example 'pending'
   */
  status: NotificationStatus;

  /**
   * The date the notification was created
   * @example '2031-01-01T00:00:00Z'
   */
  createdAt: Date;

  /**
   * The date the notification was updated
   * @example '2031-01-01T00:00:00Z'
   */
  updatedAt: Date;
}
