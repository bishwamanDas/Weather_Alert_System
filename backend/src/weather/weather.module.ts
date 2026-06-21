import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [WeatherService],
})
export class WeatherModule {}
