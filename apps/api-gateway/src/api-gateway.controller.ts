import { Controller, Get } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { AllowAnonymous } from '@app/common';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @AllowAnonymous()
  @Get('health')
  public healthCheck() {
    return this.apiGatewayService.healthCheck();
  }
}
