import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './createResume.dto';
import { IsNotEmpty, IsString } from 'class-validator';

// Makes all fields optional for updating
export class UpdateResumeDto extends PartialType(CreateResumeDto) {
  @IsString()
  @IsNotEmpty()
  _id: string; // resume Id
}
