import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  authServicePort: parseInt(process.env.AUTH_SERVICE_PORT ?? '3001', 10), // service port
  authServiceHost: process.env.AUTH_SERVICE_HOST ?? 'localhost', // service host
  secret: process.env.JWT_TOKEN_SECRET,
  jwt_token_expiresIn: parseInt(process.env.JWT_TOKEN_EXPIRESIN ?? '3600', 10), // string value converted into integer of base 10
  refreshTokenExpiresIn: parseInt(
    process.env.REFRESH_TOKEN_EXPIRESIN ?? '86400',
    10,
  ),
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
}));
// when creating the config object using registerAs then by default it creates a key for that config object
