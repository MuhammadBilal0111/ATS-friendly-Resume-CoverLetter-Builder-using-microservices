import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export interface JwtCookiePayload {
  accessToken: string;
  refreshToken: string;
}

/**
 * Extracts access and refresh tokens from cookies
 * Usage: @JwtFromCookie() tokens
 */
export const JwtFromCookie = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtCookiePayload => {
    const request = ctx.switchToHttp().getRequest();
    const cookies = request.cookies || {};

    if (!cookies['access_token'] || !cookies['refresh_token']) {
      throw new UnauthorizedException('Missing authentication cookies');
    }
    return {
      accessToken: cookies['access_token'],
      refreshToken: cookies['refresh_token'],
    };
  },
);
