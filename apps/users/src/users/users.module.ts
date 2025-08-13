import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import envValidation from './config/env.Validation';
import { join } from 'path';
import { User } from './entities/users.entity';
import { BcryptProvider, HashingProvider } from '@app/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      isGlobal: false, // only be use in users module
      load: [appConfig, databaseConfig],
      envFilePath: join(__dirname, '/', '../../../apps/users/.env'),
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // entities: [User], // defines the tables to create, now typeorm aware about the user entity, you have to define every entity here
        autoLoadEntities: configService.get<boolean>('userDB.autoLoadEntities'), // whenever you create a new entity it will be auto loaded and tables will be created in DB, ensure it must be import using type module
        synchronize: configService.get<boolean>('userDB.synchronize'), // synchronize our entity with database, whatever we  change here immediately show changes in db
        host: configService.get<string>('userDB.host'),
        port: +configService.get('userDB.port'), // 5432
        username: configService.get<string>('userDB.username'),
        password: configService.get<string>('userDB.password'),
        database: configService.get<string>('userDB.name'),
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
