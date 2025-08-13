import { IsNotEmpty, IsInt } from 'class-validator';

export class ResumeByUserIdDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
