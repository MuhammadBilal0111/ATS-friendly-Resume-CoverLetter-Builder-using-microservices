import { Inject, Injectable } from '@nestjs/common';
import { NotificationsDto, RESEND_CLIENT } from '@app/contracts';
import { Resend } from 'resend';
import { getLoginGreetingTemplate } from './templates/login-greeting.template';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  constructor(
    private readonly resendConfig: ConfigService,
    @Inject(RESEND_CLIENT) private readonly resend: Resend,
  ) {}

  public async sendWelcomeEmail(notificationDto: NotificationsDto) {
    try {
      const { data, error } = await this.resend.emails.send({
        from: this.resendConfig.get<string>('resendConfig.fromEmail')!,
        to: [notificationDto.to],
        subject: 'Welcome Back to BaliResumate!',
        html: getLoginGreetingTemplate(notificationDto.username),
      });
      if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
}
