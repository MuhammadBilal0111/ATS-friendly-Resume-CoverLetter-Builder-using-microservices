import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  getHello(): string {
    // return this.apiGatewayService.getHello();
    throw {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Authorization token missing.',
      cause: 'No token found in cookie or header',
    };
  }
}
