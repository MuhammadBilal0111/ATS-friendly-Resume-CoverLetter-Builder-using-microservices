import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ResumeDto } from '../../common/dto/resume.dto';

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
  @Type(() => ResumeDto)
  resume: ResumeDto;
}
