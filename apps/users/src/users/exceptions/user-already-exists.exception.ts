import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

// Every custom exception should extend RpcException
export class UserAlreadyExistsException extends RpcException {
  constructor(fieldName: string, fieldValue: string) {
    super({
      message: `User with ${fieldName} '${fieldValue}' already exists`,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
