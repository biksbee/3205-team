import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    CreateShortLinkResponse,
    DeleteLinkResponse,
    GetAnalyticsLinkResponse, GetInfoShortLinkResponse, LinksListResponse,
} from './links.response';
import { LinksService } from './links.service';
import { CreateShortLinkDto, ListLinkDto, RedirectByShortLinkDto } from './links.dto';


@ApiTags('Ссылки')
@Controller('links')
export class LinksController {
    constructor(
        private linksService: LinksService
    ) {
    }

    @Get('/:shortUrl')
    @ApiOperation({
        summary: 'Переадресация',
        description: 'Этот эндпоинт позволяет переадресовать пользователя на оригинальный URL'
    })
    @ApiResponse({})
    async get(
      @Param() { shortUrl }: RedirectByShortLinkDto,
      @Req() request: Request,
      @Res() response: Response
    ): Promise<void> {
        const ip = request.ip;
        const fingerprint = request.fingerprint.hash;
        const link = await this.linksService.redirect(shortUrl, ip, fingerprint)
        return response.redirect(link.originalUrl)
    }

    @Get('/info/:shortUrl')
    @ApiOperation({
        summary: 'Информация о короткой ссылке',
        description: 'Этот эндпоинт позволяет переадресовать пользователя на оригинальный URL'
    })
    @ApiResponse({
        status: 200,
        description: 'Информация о короткой ссылке',
        type: GetInfoShortLinkResponse
    })
    async getInfo(
      @Param() { shortUrl }: RedirectByShortLinkDto
    ): Promise<GetInfoShortLinkResponse> {
        return await this.linksService.redirect(shortUrl)
    }

    @Get('/analytics/:shortUrl')
    @ApiOperation({
        summary: 'Получение аналитики по ссылке',
        description: 'Этот эндпоинт позволяет вернуть количество переходов по ссылке и последние 5 IP-адресов.'
    })
    @ApiResponse({
        status: 200,
        description: 'Аналитика по короткой ссылке',
        type: GetAnalyticsLinkResponse
    })
    async analytics(
      @Param() { shortUrl }: RedirectByShortLinkDto
    ): Promise<GetAnalyticsLinkResponse> {
        return await this.linksService.analytics(shortUrl)
    }

    @Post('/shorten')
    @ApiOperation({
        summary: 'Создание короткой ссылки',
        description: 'Этот эндпоинт принимает JSON с полем originalUrl (обязательное) и возвращает укороченный URL'
    })
    @ApiResponse({
        status: 201,
        description: 'Созданная короткая ссылка',
        type: CreateShortLinkResponse
    })
    async create(
      @Body() dto: CreateShortLinkDto,
      @Req() request: Request
    ): Promise<CreateShortLinkResponse> {
        const fingerprint = request.fingerprint.hash;
        return await this.linksService.create({ fingerprint, ...dto })
    }

    @Post('/list')
    @ApiOperation({
        summary: 'Получения списка ссылок',
        description: 'Этот эндпоинт позволяет получить список ссылок хранящихся в базе'
    })
    @ApiResponse({
        status: 200,
        description: 'Список ссылок',
        type: LinksListResponse
    })
    async list(
      @Body() dto: ListLinkDto
    ): Promise<LinksListResponse> {
        return await this.linksService.list(dto)
    }

    @Delete('/delete/:shortUrl')
    @ApiOperation({
        summary: 'Удаление короткой ссылки',
        description: 'Этот эндпоинт удаляет короткую ссылку'
    })
    @ApiResponse({
        type: DeleteLinkResponse
    })
    async delete(
      @Param() { shortUrl }: RedirectByShortLinkDto
    ): Promise<DeleteLinkResponse> {
        return await this.linksService.delete(shortUrl)
    }
}