import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsDto } from '@app/contracts';
import { NOTIFICATION_PATTERNS } from '@app/contracts';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @EventPattern(NOTIFICATION_PATTERNS.SEND_WELCOME_EMAIL)
  public sendWelcomeEmail(@Payload() notificationDto: NotificationsDto) {
    return this.notificationService.sendWelcomeEmail(notificationDto);
  }
}
