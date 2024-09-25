import { Module } from '@nestjs/common';
import { OpenWeatherService } from './services/openweather.service';
import { OpenWeatherController } from './controllers/openweather.controller';

@Module({
  imports: [],
  controllers: [OpenWeatherController],
  providers: [OpenWeatherService],
})
export class AppModule {}
