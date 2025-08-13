import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

// ExceptionFilter is used to override default exception handlerr
@Catch(HttpException) // global filter usedto handles http exception
export class HttpGlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {} // injecting configuration service
  private readonly logger = new Logger(HttpGlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // ctx = context allow to access req properrties
    const request = ctx.getRequest<Request>(); // get request object from context
    const response = ctx.getResponse<Response>(); // get response object from context
    // nestjs used express to handle request

    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    // get status from exception
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            message: exception?.message || 'Internal server error',
            statusCode: status,
          };

    const error =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as Record<string, any>);

    const errorResponse: Record<string, any> = {
      statusCode: status,
      error: error.error || 'Error',
      message: error.message || 'Unexpected error occurred',
      description: error.description || null,
      path: request.url,
      timestamp: new Date().toISOString(),
    };
    // Only attach stack trace in development
    if (!isProduction && exception?.stack) {
      errorResponse.stack = exception.stack;
    }

    this.logger.error(
      `[${request.method}] ${request.url} ${status} - ${errorResponse.message}`,
      exception?.stack || error.description || '',
    );

    response.status(status).json(errorResponse);
  }
}
