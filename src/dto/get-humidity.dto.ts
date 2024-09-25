import { IsNumber, IsLatitude, IsLongitude, Min, Max } from 'class-validator';

export class GetHumidityDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  humidity: number;

  @IsLatitude()
  latitude: number;

  @IsLongitude()
  longitude: number;
}
