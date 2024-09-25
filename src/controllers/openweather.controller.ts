import { Controller, Post, Body } from '@nestjs/common';
import { OpenWeatherService } from '../services/openweather.service';
import { GetHumidityDto } from '../dto/get-humidity.dto';

@Controller('weather')
export class OpenWeatherController {
  constructor(private readonly openWeatherService: OpenWeatherService) {}

  @Post('check-humidity')
  async checkHumidity(
    @Body() getHumidityDto: GetHumidityDto,
  ): Promise<{ message: string }> {
    const { humidity, latitude, longitude } = getHumidityDto;

    const currentHumidity = await this.openWeatherService.getHumidity(
      latitude,
      longitude,
    );

    if (currentHumidity > humidity) {
      return {
        message: `Alerta: A umidade atual é de ${currentHumidity}%, que é maior que o valor informado de ${humidity}%`,
      };
    }

    return {
      message: `A umidade atual é de ${currentHumidity}%, que está dentro do limite informado de ${humidity}%`,
    };
  }
}
