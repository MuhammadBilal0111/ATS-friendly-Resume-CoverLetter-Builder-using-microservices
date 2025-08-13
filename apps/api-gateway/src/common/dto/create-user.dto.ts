import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username cannot be empty!' })
  @MaxLength(50, { message: 'Username too long!' })
  username: string;

  @IsEmail({}, { message: 'Invalid email format!' })
  @IsNotEmpty({ message: 'Email cannot be empty!' })
  @MaxLength(50, { message: 'Email too long!' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty!' })
  @MinLength(8, { message: 'Password must be at least 8 characters!' })
  @MaxLength(50, { message: 'Password too long!' })
  password: string;
}
