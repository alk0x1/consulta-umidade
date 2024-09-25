import { IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetHumidityDto {
  @ApiProperty({
    description: 'Valor de umidade informado pelo usuário em porcentagem.',
    example: 60,
  })
  @IsNumber()
  humidity: number;

  @ApiProperty({
    description: 'Latitude da localização.',
    example: -25.42778,
  })
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    description: 'Longitude da localização.',
    example: -49.27306,
  })
  @IsLongitude()
  longitude: number;
}
