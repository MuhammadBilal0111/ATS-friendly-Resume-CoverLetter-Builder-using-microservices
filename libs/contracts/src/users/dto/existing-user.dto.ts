import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class ExistingUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Min(8, { message: 'Min 8 characters are required!' })
  password: string;
}
