import { Module } from '@nestjs/common';
import { NotificationsModule } from './notification/notification.module';

@Module({
  imports: [NotificationsModule],
})
export class NotificationAppModule {}
