import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteResumeDto {
  @IsNotEmpty()
  @IsString()
  resumeId: string;
}
