import { registerAs } from '@nestjs/config';
// Custom Configuration File with namespace 'rabbitMq'
export default registerAs('rabbitMq', () => ({
  rabbitMqUri: process.env.RABBIT_MQ_URI,
}));
