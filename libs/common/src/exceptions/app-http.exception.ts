import { HttpException, HttpStatus } from '@nestjs/common';
import { getErrorType } from '../utils/error-utils';

/**
 * Exception for wrapping RPC microservice errors in a standard HTTP response.
 */
export class AppRpcHttpException extends HttpException {
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
 * Converts microservice (RPC) error object into standardized AppRpcHttpException.
 * To be used in API Gateway when catching errors from microservices.
 */
export function throwHttpExceptionFromRpc(error: any): never {
  const { statusCode, message, cause } = error || {};
  throw new AppRpcHttpException(statusCode, message, cause);
}
