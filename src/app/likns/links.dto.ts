import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches } from 'class-validator';

export class CreateShortLinkDto {
    @ApiProperty({ example: 'https://google.com', description: 'Оригинальная URL' })
    originalUrl: string;

    @ApiProperty({ maxLength: 20, example: ';wl34u2o3', description: 'Пользовательский алиас' })
    alias?: string;

    @ApiProperty({description: 'Время жизни ссылки', example: '1d | 1h | 10m'})
    @IsOptional()
    @Matches(/^d+[dmh]$/, {
        message: 'ExpiresAt должно быть строкой с числом и одной из букв d, h, m (1d | 1h | 10m)'
    })
    expiresAt?: string;
}

export class RedirectByShortLinkDto {
    @ApiProperty({ example: '', description: 'Короткий URL' })
    shortUrl: string;
}