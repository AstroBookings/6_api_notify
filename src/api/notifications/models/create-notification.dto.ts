import { IsString } from 'class-validator';

/**
 * Data transfer object for creating a notification
 */
export class CreateNotificationDto {
  @IsString()
  templateId: string;
  @IsString()
  userId: string;
  @IsString()
  data: string;
}
