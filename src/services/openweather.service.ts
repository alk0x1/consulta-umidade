import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { OpenWeatherResponse } from '../@types/api_response';

dotenv.config();

@Injectable()
export class OpenWeatherService {
  private readonly apiKey: string = process.env.OPENWEATHER_API_KEY;
  private readonly baseUrl: string =
    'https://api.openweathermap.org/data/2.5/weather';

  async getHumidity(lat: number, lon: number): Promise<number> {
    try {
      const response = await axios.get<OpenWeatherResponse>(this.baseUrl, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric',
        },
      });
      const humidity = response.data.main.humidity;
      console.log(humidity);
      return humidity;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        'Erro ao consultar a API do OpenWeather.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
