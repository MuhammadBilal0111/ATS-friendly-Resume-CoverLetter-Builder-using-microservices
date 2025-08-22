import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { COVER_LETTER_CLIENT } from '@app/contracts';
import { ClientConfigModule } from '../client-config/client-config.module';
import { ClientConfigService } from '../client-config/client-config.service';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterController } from './cover-letter.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ClientConfigModule, AuthModule],
  controllers: [CoverLetterController],
  providers: [
    CoverLetterService,
    {
      provide: COVER_LETTER_CLIENT,
      useFactory: (configService: ClientConfigService) => {
        const clientOptions = configService.getCoverLetterClientOptions(); // return client configuration object
        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ClientConfigService],
    },
  ],
})
export class CoverLetterModule {}
