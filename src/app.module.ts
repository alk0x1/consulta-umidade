import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenWeatherService } from './services/openweather.service';
import { OpenWeatherController } from './controllers/openweather.controller';

@Module({
  imports: [],
  controllers: [AppController, OpenWeatherController],
  providers: [AppService, OpenWeatherService],
})
export class AppModule {}
