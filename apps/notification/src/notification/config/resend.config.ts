// Resend namespace configuration

import { registerAs } from '@nestjs/config';

export default registerAs('resendConfig', () => ({
  resendApiKey: process.env.RESEND_API_KEY,
  fromEmail: `BaliResumate <${process.env.RESEND_FROM_EMAIL}>`,
}));
