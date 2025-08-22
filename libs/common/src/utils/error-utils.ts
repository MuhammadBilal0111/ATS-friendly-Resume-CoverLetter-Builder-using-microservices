import { HttpStatus } from '@nestjs/common';

export function getErrorType(statusCode: number): string {
  switch (statusCode) {
    case HttpStatus.BAD_REQUEST:
      return 'Bad Request';
    case HttpStatus.UNAUTHORIZED:
      return 'Unauthorized';
    case HttpStatus.FORBIDDEN:
      return 'Forbidden';
    case HttpStatus.NOT_FOUND:
      return 'Not Found';
    case HttpStatus.CONFLICT:
      return 'Conflict';
    case HttpStatus.INTERNAL_SERVER_ERROR:
    default:
      return 'Internal Server Error';
  }
}
