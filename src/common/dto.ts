import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({example: '10', description: 'Количество получаемых элементов', required: true})
  limit: number;

  @ApiProperty({example: '0', description: 'Позиция, с которой получаем список', required: true})
  offset: number;
}

export class OrderDto {
  @ApiProperty({description: 'Поле для сортировки', example: 'id', required: true})
  field: string;

  @ApiProperty({description: 'Направление сортировки (asc или desc)', example: 'asc', required: true})
  by: 'asc' | 'desc';
}