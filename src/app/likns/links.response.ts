import { ApiProperty } from '@nestjs/swagger';

export class CreateShortLinkResponse {
    @ApiProperty({ description: 'Короткая ссылка', example: ''})
    shortLink: string;
}

export class GetInfoShortLinkResponse {
    @ApiProperty({ description: 'Короткая ссылка', example: ''})
    originalUrl: string;

    @ApiProperty({ description: 'Дата создания', example: ''})
    createdAt: Date;

    @ApiProperty({ description: 'Короткая ссылка', example: '10'})
    clickCount: number;
}

export class IpAddressResponse {
    @ApiProperty({})
    ip: string;
}

export class GetAnalyticsLinkResponse {
    @ApiProperty({ description: 'Короткая переходов по ссылке', example: '10'})
    clickCount: number;

    @ApiProperty({ description: 'Последние пять ip-адресов', example: ['', '']})
    ips: string[]
}

export class DeleteLinkResponse {
    @ApiProperty({})
    success: boolean;
}
