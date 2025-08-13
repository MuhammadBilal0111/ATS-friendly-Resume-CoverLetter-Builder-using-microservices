import { registerAs } from '@nestjs/config';
// Custom Configuration File with namespace 'resumeDB'
export default registerAs('resumeDB', () => ({
  db_url: process.env.MONGODB_URI,
  type: process.env.DB_TYPE,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  autoLoadEntities: process.env.AUTO_LOAD === 'true' ? true : false,
  synchronize: process.env.DB_SYNC === 'true' ? true : false,
}));
