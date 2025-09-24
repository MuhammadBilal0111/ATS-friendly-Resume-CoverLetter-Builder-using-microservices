import { registerAs } from '@nestjs/config';

export default registerAs('microServiceConfig', () => ({
  apiGatewayPort: parseInt(process.env.API_GATEWAY_PORT || '3000', 10),

  authServiceHost: process.env.AUTH_SERVICE_HOST!,
  authServicePort: parseInt(process.env.AUTH_SERVICE_PORT || '3001', 10),

  resumeServiceHost: process.env.RESUME_SERVICE_HOST!,
  resumeServicePort: parseInt(process.env.RESUME_SERVICE_PORT || '3002', 10),

  usersServiceHost: process.env.USERS_SERVICE_HOST!,
  usersServicePort: parseInt(process.env.USERS_SERVICE_PORT || '3003', 10),

  coverLetterServiceHost: process.env.COVER_LETTER_SERVICE_HOST!,
  coverLetterServicePort: parseInt(
    process.env.COVER_LETTER_SERVICE_PORT || '3005',
    10,
  ),
  corsOrigin: process.env.CORS_ORIGIN!,
}));
