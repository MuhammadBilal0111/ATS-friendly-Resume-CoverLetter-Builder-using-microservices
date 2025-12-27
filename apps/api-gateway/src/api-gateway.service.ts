import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiGatewayService {
  public healthCheck() {
    return {
      status: 'OK',
      message: 'API Gateway running successfully!',
      timestamp: new Date().toISOString(),
    };
  }
}
