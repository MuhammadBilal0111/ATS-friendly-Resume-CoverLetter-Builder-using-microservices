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
  UseGuards,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/createResume.dto';
import { UpdateResumeDto } from './dto/updateResume.dto';
import { ActiveUser, AuthorizeGuard } from '@app/common';
import { OptimizeResumeDto } from './dto/optimizeResume.dto';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { ROUTES } from '../routes.constants';

// Base route: http://localhost:3000/resume

@UseGuards(AuthorizeGuard) // guard use for authorization
@Controller(ROUTES.RESUME)
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  // POST /resume
  // Create a new resume
  // Example: http://localhost:3000/resume
  @Post()
  public createResume(
    @Body() createResumeDto: CreateResumeDto,
    @ActiveUser('sub') userId: number = 13,
  ) {
    return this.resumeService.createResume(createResumeDto, userId);
  }

  // GET /resume/:userId
  // Get a resume by user ID
  // Example: http://localhost:3000/resume/123
  @Get()
  public getResumeByUserId(@ActiveUser('sub') userId: number) {
    console.log(userId);
    return this.resumeService.getResumeByUserId(userId);
  }

  // PUT /resume
  // Update an existing resume
  // Example: http://localhost:3000/resume/123
  @HttpCode(HttpStatus.CREATED)
  @Put()
  public updateResume(@Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.updateResume(updateResumeDto);
  }

  // DELETE /resume/:resumeId
  // Delete a resume by resume ID
  // Example: http://localhost:3000/resume/resume_3457
  @Delete(':resumeId')
  @HttpCode(HttpStatus.OK) // 200 status code
  public deleteResume(@Param('resumeId', ParseObjectIdPipe) resumeId: string) {
    return this.resumeService.deleteResume(resumeId);
  }

  // POST /resume/optimize
  // Optimize a resume for ATS (Applicant Tracking Systems) using AI
  // Sends the provided resume data and job description to the AI microservice
  // Example: POST http://localhost:3000/resume/optimize
  @Post('optimize')
  public optimizeResume(@Body() optimizeResumeDto: OptimizeResumeDto) {
    return this.resumeService.optimizeResume(optimizeResumeDto);
  }
}
