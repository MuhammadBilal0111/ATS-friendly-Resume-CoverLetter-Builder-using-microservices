import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateResumeDto } from './createResume.dto';

export class OptimizeResumeDto {
  @ValidateNested()
  @Type(() => CreateResumeDto)
  resume: CreateResumeDto;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;
}
