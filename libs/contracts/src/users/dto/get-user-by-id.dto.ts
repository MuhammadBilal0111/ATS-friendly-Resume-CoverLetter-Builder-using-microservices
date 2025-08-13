import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class GetUserByIdDto {
  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be greater than 0' })
  @IsNotEmpty({ message: 'User ID cannot be empty' })
  userId: number;
}
