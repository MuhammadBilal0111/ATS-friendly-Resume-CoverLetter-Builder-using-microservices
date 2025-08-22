import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable() // First, we define a provider. The @Injectable() decorator marks the CatsService class as a provider.
export class ClientConfigService {
  constructor(private readonly configService: ConfigService) {}

  getApiGatewayPort(): number {
    return this.configService.get<number>('microServiceConfig.apiGatewayPort')!;
  }

  getUserClientPort(): number {
    return this.configService.get<number>(
      'microServiceConfig.userServicePort',
    )!;
  }

  getResumeClientPort(): number {
    return this.configService.get<number>(
      'microServiceConfig.resumeServicePort',
    )!;
  }

  getCoverLetterClientPort(): number {
    return this.configService.get<number>(
      'microServiceConfig.coverLetterServicePort',
    )!;
  }

  getAuthClientPort(): number {
    // transport port match with the auth microservice's transport port and for all
    return this.configService.get<number>(
      'microServiceConfig.authServicePort',
    )!;
  }
  getAiClientPort(): number {
    return this.configService.get<number>('microServiceConfig.aiServicePort')!;
  }

  getUserClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP, // transport protocol match with the auth microservice's transport protocol and for all
      options: {
        port: this.getUserClientPort(),
      },
    };
  }

  getAuthClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP, // transport protocol match with the auth microservice's transport protocol and for all
      options: {
        port: this.getAuthClientPort(),
      },
    };
  }

  getResumeClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: this.getResumeClientPort(),
      },
    };
  }
  getCoverLetterClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: this.getCoverLetterClientPort(),
      },
    };
  }
  getAiClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        port: this.getAiClientPort(),
      },
    };
  }
}
