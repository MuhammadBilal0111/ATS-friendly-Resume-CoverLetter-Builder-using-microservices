import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class AppRpcException extends RpcException {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly cause?: any,
  ) {
    super({ statusCode, message, cause });
  }
}
