import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ExpireCookieInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const isProd = process.env.NODE_ENV === 'production';
    
    return next.handle().pipe(
      map((data) => {
        // Clear both cookies using same options as in setCookie()
        const clearOptions = {
          httpOnly: true,
          secure: isProd ? true : false,
          sameSite: isProd ? 'none' : 'lax',
          path: '/',
        };
        response.clearCookie('access_token', clearOptions);
        response.clearCookie('refresh_token', clearOptions);
        return data;
      }),
    );
  }
}
