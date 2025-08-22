import { Controller } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateResumeDto,
  DeleteResumeDto,
  OptimizeResumeDto,
  RESUME_PATTERNS,
  ResumeByUserIdDto,
  UpdateResumeDto,
} from '@app/contracts';

@Controller()
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  // Handle resume creation request from the API Gateway
  // The payload contains resume data sent by the client
  @MessagePattern(RESUME_PATTERNS.CREATE_RESUME)
  public async createResume(@Payload() createResumeDto: CreateResumeDto) {
    return this.resumeService.createResume(createResumeDto);
  }

  // Handle request to fetch resume data by user ID
  @MessagePattern(RESUME_PATTERNS.GET_RESUME_BY_USER_ID)
  public async getResumeByUserId(
    @Payload() resumeByUserIdDto: ResumeByUserIdDto,
  ) {
    return this.resumeService.getResumeByUserId(resumeByUserIdDto);
  }

  // Handle resume update request
  @MessagePattern(RESUME_PATTERNS.UPDATE_RESUME)
  public async updateResume(@Payload() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.updateResume(updateResumeDto);
  }

  // Handle resume deletion request
  @MessagePattern(RESUME_PATTERNS.DELETE_RESUME)
  public async deleteResume(@Payload() deleteResumeDto: DeleteResumeDto) {
    return this.resumeService.deleteResume(deleteResumeDto);
  }

  // Handle optimze Resume for ATS
  @MessagePattern(RESUME_PATTERNS.OPTIMIZE_RESUME)
  public async optimizeResume(@Payload() optimizeResumeDto: OptimizeResumeDto) {
    return this.resumeService.optimizeResume(optimizeResumeDto);
  }
}
