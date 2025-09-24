import { registerAs } from '@nestjs/config';

export default registerAs('cover-letter', () => ({
  coverLetterServicePort: parseInt(
    process.env.COVER_LETTER_SERVICE_PORT ?? '3000',
    10,
  ),
  coverLetterServiceHost: process.env.COVER_LETTER_SERVICE_HOST ?? 'localhost',
}));
