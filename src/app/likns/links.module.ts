import { MiddlewareConsumer, Module } from '@nestjs/common';
import { FingerprintMiddleware } from '../../common/fingerprint.middleware';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { LinksModel } from './models/links.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { IpAddressesModel } from './models/ip-addresses.model';

@Module({
    providers: [LinksService],
    controllers: [LinksController],
    imports: [
        SequelizeModule.forFeature([
          LinksModel,
          IpAddressesModel
        ])
    ],
    exports: [LinksService]
})
export class LinksModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(FingerprintMiddleware)
          .forRoutes(LinksController)
    }
}