import { registerAs } from '@nestjs/config';

export default registerAs('usersDB', () => ({
  url: process.env.DB_URL,
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
  autoLoadEntities: process.env.AUTO_LOAD === 'true' ? true : false,
}));
