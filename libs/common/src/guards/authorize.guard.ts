import { AUTH_CLIENT, AUTH_PATTERNS } from '@app/contracts';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  HttpStatus,
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

    // Skip if route is marked public
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request: Request = context.switchToHttp().getRequest();

    // Extract token from cookie or header
    let token: string | undefined;
    if (request.cookies?.access_token) {
      token = request.cookies.access_token;
    } else if (request.headers.authorization?.startsWith('Bearer ')) {
      token = request.headers.authorization.split(' ')[1];
    }

    if (!token) {
      this.logger.warn('No authorization token found (header or cookie)');
      // just throw raw error → interceptor will wrap it
      throw {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Authorization token missing.',
        cause: 'No token found in cookie or header',
      };
    }

    try {
      // Ask Auth microservice to verify JWT
      const user = await firstValueFrom(
        this.authClient.send(AUTH_PATTERNS.VERIFY_JWT, { jwt: token }),
      );

      // Attach verified user to request
      request[REQUEST_USER_KEY] = user;
      return true;
    } catch (error) {
      this.logger.warn(`JWT verification failed: ${error?.message || error}`);

      // throw raw error → ErrorsInterceptor converts to AppRpcHttpException
      throw {
        statusCode: error?.statusCode || HttpStatus.UNAUTHORIZED,
        message:
          error?.message || 'Authentication failed. Invalid or expired token.',
        cause: error,
      };
    }
  }
}
