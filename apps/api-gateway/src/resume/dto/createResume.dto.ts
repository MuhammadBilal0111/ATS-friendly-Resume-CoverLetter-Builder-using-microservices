// ✅ What does @ValidateNested() do in NestJS?
// In NestJS (which uses class-validator and class-transformer), the @ValidateNested() decorator is used when a property of a class is itself another class — essentially for validating nested objects.

import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class PersonalInfoDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  linkedin: string;
  @IsString()
  github: string;

  @IsString()
  portfolio: string;
}

class ExperienceDto {
  @IsString()
  company: string;

  @IsString()
  position: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsArray()
  @IsString({ each: true })
  points: string[];
}

class EducationDto {
  @IsString()
  school: string;

  @IsString()
  degree: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  gpa: string;
}

class ProjectDto {
  @IsString()
  name: string;

  @IsString()
  technologies: string;

  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  liveLink?: string;

  @IsArray()
  @IsString({ each: true })
  points: string[];
}

class SkillDto {
  @IsString()
  name: string;

  @IsString()
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

class CertificationDto {
  @IsString()
  name: string;

  @IsString()
  issuingBody: string;

  @IsString()
  date: string;

  @IsString()
  @IsOptional()
  link?: string;
}

class TemplateDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  headingColor: string;
}

export class CreateResumeDto {
  @ValidateNested()
  @Type(() => PersonalInfoDto)
  personalInfo: PersonalInfoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education: EducationDto[];

  @IsString()
  summary: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienceDto)
  experience: ExperienceDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectDto)
  projects: ProjectDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SkillDto)
  skills: SkillDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CertificationDto)
  certifications: CertificationDto[];

  @ValidateNested()
  @Type(() => TemplateDto)
  template: TemplateDto;
}
