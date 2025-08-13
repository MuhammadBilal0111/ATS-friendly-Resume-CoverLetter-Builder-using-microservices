import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetUserByEmail {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
