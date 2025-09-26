import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import envValidation from './config/env.Validation';
import { User } from './entities/users.entity';
import { BcryptProvider, HashingProvider, RmqModule } from '@app/common';
import rabbitMqConfig from './config/rabbitMq.config';
import usersConfig from './config/users.config';

@Module({
  imports: [
    RmqModule,
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, rabbitMqConfig, usersConfig],
      envFilePath: `${process.cwd()}/apps/users/.env`,
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: configService.get<boolean>(
          'usersDB.autoLoadEntities',
        ), // whenever you create a new entity it will be auto loaded and tables will be created in DB, ensure it must be import using type module
        synchronize: configService.get<boolean>('usersDB.synchronize'), // synchronize our entity with database, whatever we  change here immediately show changes in db
        url: configService.get<string>('usersDB.url'),
      }),
    }),
  ], // now the module know about the User entity and user repository is automatically created by TYPEORM
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
  ], // Intra modular dependency because in this module i can inject the userService
})
export class UsersModule {}
