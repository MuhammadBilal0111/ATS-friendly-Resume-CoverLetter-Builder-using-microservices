import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get('health')
  public healthCheck() {
    return this.apiGatewayService.healthCheck();
  }
}
