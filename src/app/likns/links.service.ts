import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  CreateShortLinkResponse,
  DeleteLinkResponse,
  GetAnalyticsLinkResponse,
  GetInfoShortLinkResponse,
} from './links.response';
import { LinkCreateType } from './links.type';
import { randomString } from '../../common/tool';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/sequelize';
import { LinksModel } from './models/links.model';
import { IpAddressesModel } from './models/ip-addresses.model';
import { OrderItem } from 'sequelize';
import * as Moment from 'moment';
import ms = require('ms');
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(LinksModel)
    private linksModel: typeof LinksModel,
    @InjectModel(IpAddressesModel)
    private ipAddressesModel: typeof IpAddressesModel,
    private readonly configService: ConfigService
  ) {
  }

  async create(data: LinkCreateType): Promise<CreateShortLinkResponse> {
    const secret = data.alias ? data.alias : randomString();
    const hashUrl = crypto
      .createHmac('md5', secret)
      .update(data.originalUrl)
      .digest('base64url');
    const lifetime = data.expiresAt ? ms(data.expiresAt as ms.StringValue) : ms(this.configService.get<string>('LINK_LIFITIME') as ms.StringValue)
    const expiresAt = Moment().add(lifetime, 'ms').toDate();
    const obj = {
      originalUrl: data.originalUrl,
      shortUrl: hashUrl,
      expiresAt
    };
    const link = await this.linksModel.create(obj);
    return { shortLink: link.shortUrl };
  }

  async redirect(shortUrl: string, ip: string | null = null): Promise<GetInfoShortLinkResponse> {
    const link = await this.linksModel.findOne({
      where: { shortUrl },
    });
    if (!link) {
      throw new NotFoundException('Invalid short link');
    }
    if (ip && typeof ip === 'string') {
      if(Moment().isSameOrAfter(link.expiresAt)) {
        throw new UnauthorizedException('Link was expired');
      }
      link.clickCount += 1;
      await Promise.all([
        await this.ipAddressesModel.create({ ip, linkId: link.id }),
        await link.update({ clickCount: link.clickCount }),
      ]);
    }
    return link;
  }

  async analytics(shortUrl: string): Promise<GetAnalyticsLinkResponse> {
    const link = await this.linksModel.findOne({
      attributes: ['id', 'clickCount'],
      where: { shortUrl },
    });
    const order: OrderItem[] = [['id', 'DESC']];
    const ips = await this.ipAddressesModel.findAll({
      attributes: ['ip'],
      order,
      where: { linkId: link.id },
      limit: 5,
      offset: 0,
    });

    return {
      clickCount: link.clickCount,
      ips: ips.map(ip => ip.ip)
    };
  }

  async delete(shortUrl: string): Promise<DeleteLinkResponse> {
    const link = await this.linksModel.findOne({ where: { shortUrl } });
    await link.destroy();
    return { success: true };
  }
}