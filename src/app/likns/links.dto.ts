import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches } from 'class-validator';
import { OrderDto, PaginationDto } from '../../common/dto';

export class CreateShortLinkDto {
  @ApiProperty({ example: 'https://google.com', description: 'Оригинальная URL' })
  originalUrl: string;

  @ApiProperty({ maxLength: 20, example: ';wl34u2o3', description: 'Пользовательский алиас' })
  alias?: string;

  @ApiProperty({ description: 'Время жизни ссылки', example: '1d | 1h | 10m' })
  @IsOptional()
  @Matches(/^d+[dmh]$/, {
    message: 'ExpiresAt должно быть строкой с числом и одной из букв d, h, m (1d | 1h | 10m)',
  })
  expiresAt?: string;
}

export class RedirectByShortLinkDto {
  @ApiProperty({ example: '', description: 'Короткий URL' })
  shortUrl: string;
}

export class LinksFilterDto {
  @ApiProperty({ description: 'Id ссылки', example: 1 })
  id: number;

  @ApiProperty({ description: 'Оригинальная ссылка', example: 'https://google.com/...' })
  originalUrl: string;

  @ApiProperty({ description: 'Короткая ссылка', example: '0Dys2WAFzMc0N5hlAPRlig' })
  shortUrl: string;

  @ApiProperty({ description: 'Количество переходов по ссылке', example: 3 })
  clickCount: number;

  @ApiProperty({ description: 'Даты истечения короткой ссылки', example: '2025-01-22 23:52:16'})
  expiresAt: Date;

  @ApiProperty({ description: 'Даты создания короткой ссылки', example: '2025-01-22 23:52:16'})
  createdAt: Date;
}

export class PaginationDtoIp {
  @ApiProperty({example: '10', description: 'Количество получаемых элементов', required: true})
  limit: number;
}

export class ListLinkDto {
  @ApiProperty({ description: 'Параметры пагинации Ip-адресов', type: PaginationDtoIp })
  paginationIp?: PaginationDtoIp;

  @ApiProperty({ description: 'Параметры сортировки Ip-адресов', type: OrderDto })
  orderIp?: OrderDto;

  @ApiProperty({ description: 'Фильтрация', type: LinksFilterDto })
  filter?: LinksFilterDto

  @ApiProperty({ description: 'Параметры пагинации ссылок', type: PaginationDto })
  pagination?: PaginationDto;

  @ApiProperty({ description: 'Параметры сортировки ссылок', type: OrderDto })
  order?: OrderDto;
}