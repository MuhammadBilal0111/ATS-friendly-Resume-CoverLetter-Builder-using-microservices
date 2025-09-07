import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class NotificationDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  userName: string;
}

