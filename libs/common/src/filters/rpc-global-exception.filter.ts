// libs/common/filters/rpc-global-exception.filter.ts

import { Catch, ArgumentsHost, Logger, HttpStatus } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';

@Catch(RpcException) // global filter usedto handles rcp exception
export class RpcGlobalExceptionFilter extends BaseRpcExceptionFilter {
  private readonly logger = new Logger(RpcGlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    console.log('exception from ', exception);
    // Log all exceptions with stack trace if available
    this.logger.error(
      `[RPC Error] ${exception?.message || 'Unknown RPC error'}`,
      exception?.stack || exception?.cause || '',
    );

    // If it's already an RpcException, forward it as-is
    if (exception instanceof RpcException) {
      return super.catch(exception, host);
    }

    // Wrap unknown errors in a structured RpcException
    const rpcException = new RpcException({
      message: exception?.message || 'Internal server error',
      statusCode: exception?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      cause: exception?.cause || exception,
    });

    return super.catch(rpcException, host);
  }
}
