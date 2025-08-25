import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getErrorType } from '@app/common/utils/error-utils';

/**
 * Exception for wrapping RPC microservice errors in a standard HTTP response.
 */
export class RpcHttpException extends HttpException {
  constructor(
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    message: string = 'Microservice request failed',
    cause?: any,
  ) {
    super(
      {
        statusCode,
        error: getErrorType(statusCode),
        message,
        description:
          typeof cause === 'string'
            ? cause
            : cause?.message || 'An unexpected microservice error occurred.',
      },
      statusCode,
    );
  }
}

/**
 * Converts microservice (RPC) error object into standardized RpcHttpException.
 * To be used in API Gateway when catching errors from microservices.
 */
export function mapRpcErrorToHttpException(error: any): RpcHttpException {
  const statusCode = error?.statusCode
    ? error.statusCode
    : HttpStatus.INTERNAL_SERVER_ERROR;

  const message = error?.message || 'Microservice request failed';
  const cause = error?.cause || error;

  return new RpcHttpException(statusCode, message, cause);
}

/**
 * Global interceptor to catch and transform microservice errors into HTTP exceptions.
 */
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(() => mapRpcErrorToHttpException(err));
      }),
    );
  }
}
