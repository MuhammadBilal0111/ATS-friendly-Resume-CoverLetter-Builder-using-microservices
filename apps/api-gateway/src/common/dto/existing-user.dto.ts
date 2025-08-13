// For login DTO (formerly your ExistingUserDto)
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ExistingUserDto {
  @IsEmail({}, { message: 'Invalid email format!' })
  @IsNotEmpty({ message: 'Email cannot be empty!' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty!' })
  @MinLength(8, { message: 'Password must be at least 8 characters!' })
  password: string;
}
