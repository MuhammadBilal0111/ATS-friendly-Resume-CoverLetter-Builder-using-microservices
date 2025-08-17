import { registerAs } from '@nestjs/config';

export default registerAs('microServiceConfig', () => ({
  apiGatewayPort: parseInt(process.env.API_GATEWAY_PORT || '3000', 10),
  authServicePort: parseInt(process.env.AUTH_SERVICE_PORT || '3001', 10),
  resumeServicePort: parseInt(process.env.RESUME_SERVICE_PORT || '3002', 10),
  userServicePort: parseInt(process.env.USER_SERVICE_PORT || '3003', 10),
  aiServicePort: parseInt(process.env.USER_SERVICE_PORT || '3004', 10),
  coverLetterServicePort: parseInt(process.env.COVER_LETTER_SERVICE_PORT || '3005', 10),
}));
