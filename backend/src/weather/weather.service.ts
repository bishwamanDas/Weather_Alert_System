import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.debug('Running weather generation job for approved users');
    
    const approvedUsers = await this.prisma.user.findMany({
      where: { status: 'APPROVED', role: 'USER' }
    });

    if (approvedUsers.length === 0) {
      this.logger.debug('No approved users to generate weather alerts for.');
      return;
    }

    const weatherConditions = ['Thunderstorm Warning', 'Heavy Rain Expected', 'Clear Skies', 'High Winds Alert'];

    for (const user of approvedUsers) {
      const condition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      
      await this.prisma.alert.create({
        data: {
          userId: user.id,
          message: condition,
        }
      });
      this.logger.debug(`Generated alert for user ${user.email}: ${condition}`);
    }
  }
}
