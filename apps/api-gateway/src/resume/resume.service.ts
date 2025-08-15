import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateResumeDto } from './dto/createResume.dto';
import { UpdateResumeDto } from './dto/updateResume.dto';
import { ResumeByUserIdDto } from './dto/getResumeByUserId.dto';
import { DeleteResumeDto } from './dto/deleteResume.dto';
import { RESUME_CLIENT, RESUME_PATTERNS } from '@app/contracts';
import { lastValueFrom } from 'rxjs';
import { throwHttpExceptionFromRpc } from '@app/common';
import { OptimizeResumeDto } from './dto/optimizeResume.dto';

@Injectable()
export class ResumeService {
  // Injecting the Resume microservice client via dependency injection
  constructor(
    @Inject(RESUME_CLIENT) private readonly resumeClient: ClientProxy,
  ) {}

  // Sends a message to create a new resume
  public async createResume(createResumeDto: CreateResumeDto, userId: number) {
    try {
      return await lastValueFrom(
        this.resumeClient.send(RESUME_PATTERNS.CREATE_RESUME, {
          userId,
          ...createResumeDto,
        }),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }

  // Sends a message to get a resume by the user's ID
  public async getResumeByUserId(resumeByUserIdDto: ResumeByUserIdDto) {
    try {
      return await lastValueFrom(
        this.resumeClient.send(
          RESUME_PATTERNS.GET_RESUME_BY_USER_ID,
          resumeByUserIdDto,
        ),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }

  // Sends a message to update a resume
  public async updateResume(updateResumeDto: UpdateResumeDto) {
    try {
      return await lastValueFrom(
        this.resumeClient.send(RESUME_PATTERNS.UPDATE_RESUME, updateResumeDto),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }

  // Sends a message to delete a resume by user ID
  public async deleteResume(deleteResumeDto: DeleteResumeDto) {
    try {
      return await lastValueFrom(
        this.resumeClient.send(RESUME_PATTERNS.DELETE_RESUME, deleteResumeDto),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }
  // Sends a message ai microservice to optimize a resume

  public async optimizeResume(optimizeResumeDto: OptimizeResumeDto) {
    try {
      return await lastValueFrom(
        this.resumeClient.send(
          RESUME_PATTERNS.OPTIMIZE_RESUME,
          optimizeResumeDto,
        ),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }

  // Sends a message to save a resume (usually used for draft or intermediate save)
  public async saveResume(saveDto: any) {
    try {
      return await lastValueFrom(
        this.resumeClient.send(RESUME_PATTERNS.SAVE_RESUME, saveDto),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }

  // Sends a message to download a resume by user ID
  public async downloadResume(userId: string) {
    try {
      return await lastValueFrom(
        this.resumeClient.send(RESUME_PATTERNS.DOWNLOAD_RESUME, userId),
      );
    } catch (error) {
      throwHttpExceptionFromRpc(error);
    }
  }
}
