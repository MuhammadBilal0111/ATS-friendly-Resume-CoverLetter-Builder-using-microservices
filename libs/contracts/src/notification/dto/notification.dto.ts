import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class NotificationsDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  userName: string;
}
