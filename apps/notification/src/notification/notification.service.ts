import { Injectable } from '@nestjs/common';
import { NotificationsDto } from '@app/contracts';

@Injectable()
export class NotificationService {
  public sendWelcomeEmail(notificationDto: NotificationsDto) {
    return notificationDto;
  }
}
