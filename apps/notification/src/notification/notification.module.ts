import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import resendConfig from './config/resend.config';
import envValidation from './config/env.validation';
import { Resend } from 'resend';
import { RESEND_CLIENT } from '@app/contracts';
import { RmqService } from '@app/common';
import { RmqModule } from '@app/common';
import rabbitMqConfig from './config/rabbitMq.config';

@Module({
  imports: [
    RmqModule,
    ConfigModule.forFeature(resendConfig),
    ConfigModule.forRoot({
      isGlobal: true, // because rmq module need access to env vars
      envFilePath: `${process.cwd()}/apps/notification/.env`, // specify the environment file
      load: [resendConfig, rabbitMqConfig], // load the custom resend configuration
      validationSchema: envValidation,
    }),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    RmqService,
    {
      provide: RESEND_CLIENT,
      useFactory: (configurationService: ConfigService) => {
        return new Resend(
          configurationService.get('resendConfig.resendApiKey') as string,
        );
      },
      inject: [ConfigService],
    },
  ],
})
export class NotificationsModule {}
