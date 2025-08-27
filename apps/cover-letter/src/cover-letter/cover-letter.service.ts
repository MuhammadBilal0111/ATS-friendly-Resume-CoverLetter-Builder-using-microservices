import { AI_CLIENT, AI_PATTERNS, GenerateCoverLetterDto } from '@app/contracts';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CoverLetterService {
  constructor(
    @Inject(AI_CLIENT)
    private readonly aiClient: ClientProxy,
  ) {}

  public async generateCoverLetter(coverLetter: GenerateCoverLetterDto) {
    return this.aiClient
      .send(AI_PATTERNS.GENERATE_COVER_LETTER, coverLetter)
      .pipe(
        catchError((err) => {
          if (err instanceof RpcException) {
            return throwError(() => err);
          }
          // fallback — in case something really unexpected happens
          return throwError(() => new RpcException(err)); // already structured
        }),
      );
  }
}
