import { Controller, Inject } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationsDto } from '@app/contracts';
import { NOTIFICATION_PATTERNS } from '@app/contracts';
import { RmqService } from '@app/common';

@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject() private readonly rmqService: RmqService,
  ) {}

  /**
   * Listens for the SEND_WELCOME_EMAIL event from the message broker (e.g., RabbitMQ).
   * When this event is published by another microservice, the NotificationController
   * will handle it and trigger the notification service.
   *
   * @param notificationDto - Data Transfer Object (DTO) containing user email details
   */

  @EventPattern(NOTIFICATION_PATTERNS.SEND_WELCOME_EMAIL)
  public async sendWelcomeEmail(
    @Payload() notificationDto: NotificationsDto,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.notificationService.sendWelcomeEmail(notificationDto);
      this.rmqService.ack(context);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }
  }
}
