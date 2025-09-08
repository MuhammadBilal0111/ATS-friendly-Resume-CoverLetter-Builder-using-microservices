import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class NotificationsDto {
  @IsEmail()
  @IsNotEmpty()
  to: string; // email to send the notification to

  @IsString()
  @IsNotEmpty()
  username: string;
}
