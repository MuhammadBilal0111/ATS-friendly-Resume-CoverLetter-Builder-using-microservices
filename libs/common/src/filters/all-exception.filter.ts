import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch() // Catch all exceptions
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  // method to use htp adapter in class
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {} // HttpAdapterHost is just a wrapper that holds the actual httpAdapter inside it.

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()), // Get the current request URL
      message: 'Internal server error',
    };

    this.logger.error(
      `Exception thrown: ${responseBody.message}`,
      exception?.stack,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus); // Manually send a response
  }
}
