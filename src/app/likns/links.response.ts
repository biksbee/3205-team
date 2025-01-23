import { ApiProperty } from '@nestjs/swagger';

export class CreateShortLinkResponse {
    @ApiProperty({ description: 'Короткая ссылка', example: ''})
    shortUrl: string;
}

export class GetInfoShortLinkResponse {
    @ApiProperty({ description: 'Короткая ссылка', example: ''})
    originalUrl: string;

    @ApiProperty({ description: 'Дата создания', example: ''})
    createdAt: Date;

    @ApiProperty({ description: 'Короткая ссылка', example: '10'})
    clickCount: number;
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

export class IpAddressesResponse {
    @ApiProperty({ description: 'Id ссылки', example: 1})
    id: number;

    @ApiProperty({ description: 'Id ссылки', example: 1})
    ip: string;

    @ApiProperty({ description: 'Фингерпринт', example: 1})
    fingerprint: string;

    @ApiProperty({ description: 'Id ссылки', example: 1})
    createdAt: Date;
}

export class LinkResponse {
    @ApiProperty({ description: 'Id ссылки', example: 1})
    id: number;

    @ApiProperty({ description: 'Оригинальная ссылка', example: 1})
    originalUrl: string;

    @ApiProperty({ description: 'Короткая ссылка', example: 1})
    shortUrl: string;

    @ApiProperty({ description: 'Количество переходов по короткой ссылке', example: 1})
    clickCount: number;

    @ApiProperty({ description: 'Дата окончания короткой ссылки', example: 1})
    expiresAt: Date;

    @ApiProperty({ description: 'Дата создания короткой ссылки', example: 1})
    createdAt: Date;

    @ApiProperty({ description: 'Массив ip адресов', type: [IpAddressesResponse]})
    ips: IpAddressesResponse[];
}

export class LinksListResponse {
    @ApiProperty({type: [LinkResponse]})
    rows: LinkResponse[];

    @ApiProperty({description: 'Количество', example: 1})
    count: number;
}