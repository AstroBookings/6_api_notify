import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * DTO for creating notifications that will be sent to recipients of an event
 */
export class CreateNotificationsDto {
  /**
   * The identifier for the template used to create the notifications.
   * It is like an event name.
   * @example 'tpl_123'
   */
  @ApiProperty({ example: 'tpl_123' })
  @IsString()
  templateId: string;

  /**
   * The user who is creating the notifications
   * @example 'usr_123'
   */
  @ApiProperty({ example: 'usr_123' })
  @IsString()
  userId: string;

  /**
   * The data associated with the event. Could be a booking, a launch, etc.
   * @example '{"bookingId": "bkn_123"}'
   */
  @IsString()
  data: string;
}
