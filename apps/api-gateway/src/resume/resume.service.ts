import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateResumeDto } from './dto/createResume.dto';
import { UpdateResumeDto } from './dto/updateResume.dto';
import { ResumeByUserIdDto } from './dto/getResumeByUserId.dto';
import { DeleteResumeDto } from './dto/deleteResume.dto';
import { RESUME_CLIENT, RESUME_PATTERNS } from '@app/contracts';
import { OptimizeResumeDto } from './dto/optimizeResume.dto';

@Injectable()
export class ResumeService {
  // Injecting the Resume microservice client via dependency injection
  constructor(
    @Inject(RESUME_CLIENT) private readonly resumeClient: ClientProxy,
  ) {}

  // Sends a message to create a new resume
  public createResume(createResumeDto: CreateResumeDto, userId: number) {
    return this.resumeClient.send(RESUME_PATTERNS.CREATE_RESUME, {
      userId,
      ...createResumeDto,
    });
  }

  // Sends a message to get a resume by the user's ID
  public getResumeByUserId(resumeByUserIdDto: ResumeByUserIdDto) {
    return this.resumeClient.send(
      RESUME_PATTERNS.GET_RESUME_BY_USER_ID,
      resumeByUserIdDto,
    );
  }

  // Sends a message to update a resume
  public updateResume(updateResumeDto: UpdateResumeDto) {
    return this.resumeClient.send(
      RESUME_PATTERNS.UPDATE_RESUME,
      updateResumeDto,
    );
  }

  // Sends a message to delete a resume by user ID
  public deleteResume(deleteResumeDto: DeleteResumeDto) {
    return this.resumeClient.send(
      RESUME_PATTERNS.DELETE_RESUME,
      deleteResumeDto,
    );
  }

  // Sends a message ai microservice to optimize a resume
  public optimizeResume(optimizeResumeDto: OptimizeResumeDto) {
    return this.resumeClient.send(
      RESUME_PATTERNS.OPTIMIZE_RESUME,
      optimizeResumeDto,
    );
  }
}
