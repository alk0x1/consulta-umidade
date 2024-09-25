import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherService } from './openweather.service';
import axios from 'axios';

jest.mock('axios'); // Moca o Axios para evitar requisições reais durante os testes

describe('OpenWeatherService', () => {
  let service: OpenWeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenWeatherService],
    }).compile();

    service = module.get<OpenWeatherService>(OpenWeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return humidity value from API response', async () => {
    const lat = -25.42778;
    const lon = -49.27306;
    const mockResponse = {
      data: {
        main: {
          humidity: 70,
        },
      },
    };

    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    const humidity = await service.getHumidity(lat, lon);
    expect(humidity).toEqual(70);
  });

  it('should throw an exception if API call fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

    await expect(service.getHumidity(0, 0)).rejects.toThrow(
      'Erro ao consultar a API do OpenWeather.',
    );
  });
});
