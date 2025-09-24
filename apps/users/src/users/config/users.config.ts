import { registerAs } from '@nestjs/config';

export default registerAs('users', () => ({
  usersServiceHost: process.env.USERS_SERVICE_HOST ?? 'localhost',
  usersServicePort: parseInt(process.env.USERS_SERVICE_PORT ?? '3003', 10),
}));
