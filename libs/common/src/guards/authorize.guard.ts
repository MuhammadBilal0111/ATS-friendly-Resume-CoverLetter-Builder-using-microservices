import { AUTH_CLIENT, AUTH_PATTERNS } from '@app/contracts';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { REQUEST_USER_KEY } from '../constants/request.constant';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  private readonly logger = new Logger(AuthorizeGuard.name);

  constructor(
    @Inject(AUTH_CLIENT) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') {
      return false;
    }
    // Read 'isPublic' metadata
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(), // Check if metadata is set on the specific route handler (e.g., login method)
      context.getClass(), // If not found on handler, check if it's set on the class (e.g., AuthController)
    ]);

    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      this.logger.warn('Authorization header missing');
      throw new UnauthorizedException(
        'Authorization token is missing or malformed.',
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      this.logger.warn('Bearer token missing');
      throw new UnauthorizedException(
        'Authorization token is missing or malformed.',
      );
    }

    try {
      const user = await firstValueFrom(
        this.authClient.send(AUTH_PATTERNS.VERIFY_JWT, { jwt: token }),
      );
      request[REQUEST_USER_KEY] = user;
      return true;
    } catch (err) {
      this.logger.warn('JWT verification failed', err);
      throw new UnauthorizedException(
        'Invalid or expired authorization token.',
      );
    }
  }
}
