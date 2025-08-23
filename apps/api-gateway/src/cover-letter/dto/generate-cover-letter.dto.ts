import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateResumeDto } from '../../resume/dto/createResume.dto';

export class GenerateCoverLetterDto {
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @ValidateNested()
  @Type(() => CreateResumeDto)
  resume: CreateResumeDto;
}
