import { ApiProperty } from '@nestjs/swagger';
import { NotificationStatus } from './notifications-status.enum';

/**
 * DTO with the notification data
 */
export class NotificationDto {
  /**
   *The id of the notification
   */
  @ApiProperty({ example: 'ntf_123' })
  id: string;

  /**
   *The id of the template
   */
  @ApiProperty({ example: 'tpl_123' })
  templateId: string;

  /**
   *The id of the user who created the notification
   */
  @ApiProperty({ example: 'usr_123' })
  userId: string;

  /**
   *The data of the notification
   */
  @ApiProperty({ example: '{"bookingId": "bkn_123"}' })
  data: string;

  /**
   *The recipient of the notification
   */
  @ApiProperty({ example: 'john@example.com' })
  recipient: string;

  /**
   *The subject of the notification
   */
  @ApiProperty({ example: 'Booking Scheduled' })
  subject: string;

  /**
   *The message of the notification
   */
  @ApiProperty({ example: 'Hello, John! Your booking bkn_123 is scheduled.' })
  message: string;

  /**
   *The status of the notification (pending, sent, failed)
   */
  @ApiProperty({ example: `pending` })
  status: NotificationStatus;

  /**
   *The created at date of the notification
   */
  @ApiProperty({ example: '2031-01-01T00:00:00Z' })
  createdAt: Date;

  /**
   *The updated at date of the notification
   */
  @ApiProperty({ example: '2031-01-01T00:00:00Z' })
  updatedAt: Date;
}
