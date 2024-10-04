import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * DTO for creating a notification that will be sent to a recipient or a group of recipients
 */
export class CreateNotificationDto {
  /**
   * The unique identifier for the template used to create the notification
   */
  @ApiProperty({ example: 'tpl_123' })
  @IsString()
  templateId: string;

  /**
   * The unique identifier for the user who is creating the notification
   */
  @ApiProperty({ example: 'usr_123' })
  @IsString()
  userId: string;

  /**
   * The data associated with the notification
   */
  @ApiProperty({ example: '{"bookingId": "bkn_123"}' })
  @IsString()
  data: string;
}
