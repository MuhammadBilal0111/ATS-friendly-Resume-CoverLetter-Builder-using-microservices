import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class UsersNotFoundException extends RpcException {
  constructor(fieldName: string, fieldValue: string) {
    super({
      message: `User with ${fieldName} '${fieldValue}' not found`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
