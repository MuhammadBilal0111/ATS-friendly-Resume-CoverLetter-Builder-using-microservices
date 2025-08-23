import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Response } from 'express';

// Helper to set a secure cookie
function setCookie(
  response: Response,
  name: string,
  value: string,
  maxAgeMs: number,
) {
  const isProd = process.env.NODE_ENV === 'production';
  response.cookie(name, value, {
    httpOnly: true,
    secure: isProd ? true : false,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: maxAgeMs,
    path: '/',
  });
}

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        const {
          accessToken,
          refreshToken,
          accessTokenExpiresIn,
          refreshTokenExpiresIn,
        } = data || {};

        if (
          accessToken &&
          refreshToken &&
          accessTokenExpiresIn &&
          refreshTokenExpiresIn
        ) {
          // Convert string to number (if needed)
          setCookie(
            response,
            'access_token',
            accessToken,
            +accessTokenExpiresIn,
          );
          setCookie(
            response,
            'refresh_token',
            refreshToken,
            +refreshTokenExpiresIn,
          );
        }
        // Remove tokens from response body for security
        return { ...data, accessToken: undefined, refreshToken: undefined };
      }),
    );
  }
}
