import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/createResumeDto';
import { UpdateResumeDto } from './dto/updateResume.dto';
import { ActiveUser } from '@app/common';

// Base route: http://localhost:3000/resume
@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  // POST /resume
  // Create a new resume
  // Example: http://localhost:3000/resume
  @Post()
  createResume(
    @Body() createResumeDto: CreateResumeDto,
    @ActiveUser('sub') userId: number,
  ) {
    return this.resumeService.createResume(createResumeDto, userId);
  }

  // GET /resume/:userId
  // Get a resume by user ID
  // Example: http://localhost:3000/resume/123
  @Get()
  getResumeByUserId(@ActiveUser('sub') userId: number) {
    return this.resumeService.getResumeByUserId({ userId });
  }

  // PUT /resume
  // Update an existing resume
  // Example: http://localhost:3000/resume/123

  @HttpCode(HttpStatus.CREATED)
  @Put(':resumeId')
  updateResume(
    @Param('resumeId') resumeId: string,
    @Body() body: Partial<UpdateResumeDto>,
  ) {
    return this.resumeService.updateResume({ resumeId, ...body });
  }

  // DELETE /resume/:resumeId
  // Delete a resume by resume ID
  // Example: http://localhost:3000/resume/resume_3457
  @Delete(':resumeId')
  @HttpCode(HttpStatus.OK) // 200 status code
  deleteResume(@Param('resumeId') resumeId: string) {
    return this.resumeService.deleteResume({ resumeId });
  }

  // POST /resume/optimize
  // Optimize a resume for ATS (Applicant Tracking Systems) using AI
  // Sends the provided resume data and job description to the AI microservice
  // Example: POST http://localhost:3000/resume/optimize
  @Post('optimize')
  public async optimizeResume(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.optimizeResume(createResumeDto);
  }

  // POST /resume/save
  // Save a resume (draft or partial save)
  // Example: http://localhost:3000/resume/123/save
  @Post(':userId/save')
  saveResume(@Body() saveDto: any) {
    return this.resumeService.saveResume(saveDto);
  }

  // GET /resume/:userId/download
  // Download the resume for a given user
  // Example: http://localhost:3000/resume/123/download
  @Get(':userId/download')
  downloadResume(@Param('userId') userId: string) {
    return this.resumeService.downloadResume(userId);
  }
}
