import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import {
  AI_CLIENT,
  AI_PATTERNS,
  CreateResumeDto,
  DeleteResumeDto,
  OptimizeResumeDto,
  ResumeByUserIdDto,
  UpdateResumeDto,
} from '@app/contracts';
import { AppRpcException } from '@app/common';
import { Resume } from './entities/resume.entity';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, throwError, timeout } from 'rxjs';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    @Inject(AI_CLIENT) private readonly aiClient: ClientProxy,
  ) {}
  // Handles the logic for creating a new resume
  // The createResumeDto contains user-provided resume data
  public async createResume(createResumeDto: CreateResumeDto) {
    let resume = this.resumeRepository.create(createResumeDto); // Maps the plain object createResumeDto to a Resume entity object.
    try {
      return await this.resumeRepository.save(resume); // save the resume entity object
    } catch (error) {
      throw new AppRpcException(
        'Resume creation failed due to an unexpected issue.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
  }
  // Fetches the resume associated with a specific user ID
  public async getResumeByUserId(resumeByUserId: ResumeByUserIdDto) {
    try {
      // This returns [array of resumes, total count]
      const [resumes, total] = await this.resumeRepository.findAndCount({
        where: { userId: resumeByUserId.userId },
      });
      return {
        total,
        resumes,
        message:
          total === 0 ? 'No resumes found!' : 'Resumes retrieved successfully',
      };
    } catch (error) {
      console.error('Error fetching resume by userId:', error);

      throw new AppRpcException(
        'Failed to fetch resume(s) for the given user ID.',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
  }
  // Updates an existing resume with new information
  public async updateResume(updateResumeDto: UpdateResumeDto) {
    const { _id: resumeId, ...resumeToUpdate } = updateResumeDto;
    try {
      const existingResume = await this.resumeRepository.findOneBy({
        _id: new ObjectId(resumeId),
      });

      if (!existingResume) {
        throw new AppRpcException(
          `Resume with ID ${resumeId} not found.`,
          HttpStatus.NOT_FOUND,
        );
      }
      // Merge new data into existing entity, excluding _id and userId
      const { _id, ...resumeDataToUpdate } = updateResumeDto;
      const mergedResume = this.resumeRepository.merge(
        existingResume,
        resumeDataToUpdate,
      );

      const updatedResume = await this.resumeRepository.save(mergedResume); // updated resume
      return {
        resume: updatedResume,
        message: 'Resume Successfully Updated',
      };
    } catch (error) {
      console.error('Error updating resume:', error);
      if (error instanceof AppRpcException) throw error;
      throw new AppRpcException(
        'Failed to update resume',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
  }
  // Deletes a user's resume from the system
  public async deleteResume(deleteResumeDto: DeleteResumeDto) {
    const resumeId = deleteResumeDto.resumeId;
    try {
      const result = await this.resumeRepository.delete({
        _id: new ObjectId(resumeId),
      });
      if (result.affected === 0) {
        throw new AppRpcException(
          `Resume with ID ${resumeId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        deleted: true,
        id: resumeId,
        message: 'Resume deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting resume:', error);
      if (error instanceof AppRpcException) throw error;
      throw new AppRpcException(
        'Failed to delete resume',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
  }
  // Optimize resume through AI
  public async optimizeResume(optimizeResumeDto: OptimizeResumeDto) {
    try {
      return this.aiClient
        .send(AI_PATTERNS.OPTIMIZE_RESUME, optimizeResumeDto)
        .pipe(
          timeout(10000), // 10 seconds
          catchError(({ err }) => {
            console.log('Error in CoverLetterService:', err);
            if (err instanceof RpcException) {
              return throwError(() => err);
            }

            // fallback — in case something really unexpected happens
            return throwError(() => new RpcException(err)); // already structured
          }),
        );
    } catch (error) {
      throw new AppRpcException(
        'Failed to optimize resume via AI microservice',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error?.message || error,
      );
    }
  }
}
