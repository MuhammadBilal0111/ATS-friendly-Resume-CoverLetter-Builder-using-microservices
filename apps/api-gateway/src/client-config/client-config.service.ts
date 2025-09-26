import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class ClientConfigService {
  constructor(private readonly configService: ConfigService) {}

  getApiGatewayPort(): number {
    return this.configService.get<number>('microServiceConfig.apiGatewayPort')!;
  }

  // -------------
  // Auth Service
  // -------------
  getAuthClientHost(): string {
    return this.configService.get<string>(
      'microServiceConfig.authServiceHost',
    )!;
  }

  getAuthClientPort(): number {
    // Transport port must match the auth microservice's configured transport port
    return this.configService.get<number>(
      'microServiceConfig.authServicePort',
    )!;
  }

  // ----------------
  // Resume Service
  // ----------------
  getResumeClientHost(): string {
    return this.configService.get<string>(
      'microServiceConfig.resumeServiceHost',
    )!;
  }

  getResumeClientPort(): number {
    return this.configService.get<number>(
      'microServiceConfig.resumeServicePort',
    )!;
  }

  // --------------
  // User Service
  // --------------
  getUserClientHost(): string {
    return this.configService.get<string>(
      'microServiceConfig.usersServiceHost',
    )!;
  }

  getUserClientPort(): number {
    return this.configService.get<number>(
      'microServiceConfig.usersServicePort',
    )!;
  }

  // -------------------
  // Cover Letter Service
  // -------------------
  getCoverLetterClientHost(): string {
    return this.configService.get<string>(
      'microServiceConfig.coverLetterServiceHost',
    )!;
  }

  getCoverLetterClientPort(): number {
    return this.configService.get<number>(
      'microServiceConfig.coverLetterServicePort',
    )!;
  }

  // --------------------------
  // ClientOptions for Auth Service
  // --------------------------
  getAuthClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP, // Use TCP transport matching the auth microservice transport protocol
      options: {
        host: this.getAuthClientHost(),
        port: this.getAuthClientPort(),
      },
    };
  }

  // ---------------------------
  // ClientOptions for Resume Service
  // ---------------------------
  getResumeClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.getResumeClientHost(),
        port: this.getResumeClientPort(),
      },
    };
  }

  // -------------------------
  // ClientOptions for User Service
  // -------------------------
  getUserClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP, // Use TCP transport matching the user microservice transport protocol
      options: {
        host: this.getUserClientHost(), // Host from configuration, typically Docker service name
        port: this.getUserClientPort(),
      },
    };
  }

  // -----------------------------
  // ClientOptions for Cover Letter Service
  // -----------------------------
  getCoverLetterClientOptions(): ClientOptions {
    return {
      transport: Transport.TCP,
      options: {
        host: this.getCoverLetterClientHost(),
        port: this.getCoverLetterClientPort(),
      },
    };
  }
}
