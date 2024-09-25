import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherController } from './openweather.controller';
import { OpenWeatherService } from '../services/openweather.service';
import { GetHumidityDto } from '../dto/get-humidity.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('OpenWeatherController', () => {
  let openWeatherController: OpenWeatherController;
  let openWeatherService: OpenWeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenWeatherController],
      providers: [
        {
          provide: OpenWeatherService,
          useValue: {
            getHumidity: jest.fn(),
          },
        },
      ],
    }).compile();

    openWeatherController = module.get<OpenWeatherController>(
      OpenWeatherController,
    );
    openWeatherService = module.get<OpenWeatherService>(OpenWeatherService);
  });

  describe('checkHumidity', () => {
    it('should return an alert if API humidity is greater than user input', async () => {
      const humidityDto: GetHumidityDto = {
        humidity: 60,
        latitude: -25.42778,
        longitude: -49.27306,
      };

      // Mock the service to return a higher humidity value
      jest.spyOn(openWeatherService, 'getHumidity').mockResolvedValue(70);

      const result = await openWeatherController.checkHumidity(humidityDto);

      expect(result).toEqual({
        message:
          'Alerta: A umidade atual é de 70%, que é maior que o valor informado de 60%',
      });
    });

    it('should return a message if API humidity is less than or equal to user input', async () => {
      const humidityDto: GetHumidityDto = {
        humidity: 60,
        latitude: -25.42778,
        longitude: -49.27306,
      };

      // Mock the service to return a lower humidity value
      jest.spyOn(openWeatherService, 'getHumidity').mockResolvedValue(50);

      const result = await openWeatherController.checkHumidity(humidityDto);

      expect(result).toEqual({
        message:
          'A umidade atual é de 50%, que está dentro do limite informado de 60%',
      });
    });
  });

  describe('checkHumidity - Error Handling', () => {
    it('should throw an exception if the OpenWeather API fails', async () => {
      const humidityDto: GetHumidityDto = {
        humidity: 60,
        latitude: -25.42778,
        longitude: -49.27306,
      };

      jest
        .spyOn(openWeatherService, 'getHumidity')
        .mockRejectedValue(
          new HttpException(
            'Erro ao consultar a API OpenWeather',
            HttpStatus.SERVICE_UNAVAILABLE,
          ),
        );

      await expect(
        openWeatherController.checkHumidity(humidityDto),
      ).rejects.toThrow('Erro ao consultar a API OpenWeather');
    });

    it('should throw an exception if humidity is not found in the API response', async () => {
      const humidityDto: GetHumidityDto = {
        humidity: 60,
        latitude: -25.42778,
        longitude: -49.27306,
      };

      jest.spyOn(openWeatherService, 'getHumidity').mockResolvedValue(null);

      await expect(
        openWeatherController.checkHumidity(humidityDto),
      ).rejects.toThrow('Umidade não encontrada na resposta da API');
    });
  });
});
