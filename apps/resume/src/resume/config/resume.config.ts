import { registerAs } from '@nestjs/config';

export default registerAs('resume', () => ({
  resumeServicePort: parseInt(process.env.RESUME_SERVICE_PORT ?? '3002', 10),
  resumeServiceHost: process.env.RESUME_SERVICE_HOST ?? 'localhost',
}));
