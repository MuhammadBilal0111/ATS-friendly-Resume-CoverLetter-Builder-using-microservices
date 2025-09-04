import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import databaseConfig from './config/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import envValidator from './config/env.validation';
import { Resume } from './entities/resume.entity';
import { ClientsModule } from '@nestjs/microservices';
import { AI_CLIENT } from '@app/contracts';
import { RMQ_QUEUES, RmqModule } from '@app/common';
import rabbitMqConfig from './config/rabbitMq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // because rmq module need access to env vars
      envFilePath: `${process.cwd()}/apps/resume/.env`, // specify the environment file
      load: [databaseConfig, rabbitMqConfig], // load the custom database and rabbitMq configuration
      validationSchema: envValidator,
    }),
    ClientsModule.register([
      {
        name: AI_CLIENT,
        options: {
          host: 'localhost',
          port: 3004,
        },
      },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mongodb'>('resumeDB.type'), // specify the database type
        url: configService.get<string>('resumeDB.db_url'),
        autoLoadEntities: configService.get<boolean>(
          'resumeDB.autoLoadEntities',
        ),
        synchronize: configService.get<boolean>('resumeDB.synchronize'), // set to false in production
      }),
    }),
    TypeOrmModule.forFeature([Resume]),
    RmqModule.register({
      clientToken: AI_CLIENT,
      queue: RMQ_QUEUES.QUEUE_RESUME_OPTIMIZE,
    }),

    // register the Resume entity with TypeORM
    // Register the entity, we can perform autoLoadEntities functionalities
    // This is where the repository gets created, now i can inject repositories in profile service
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
