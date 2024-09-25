import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { OpenWeatherService } from '../services/openweather.service';
import { GetHumidityDto } from '../dto/get-humidity.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('weather') // Categoria de "weather" na documentação do Swagger
@Controller('weather')
export class OpenWeatherController {
  constructor(private readonly openWeatherService: OpenWeatherService) {}

  @Post('check-humidity')
  @HttpCode(200)
  @ApiOperation({ summary: 'Verificar umidade' })
  @ApiResponse({
    status: 200,
    description:
      'Retorna se a umidade da API é maior que a informada pelo usuário.',
  })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiResponse({
    status: 503,
    description: 'Erro ao consultar a API OpenWeather.',
  })
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
