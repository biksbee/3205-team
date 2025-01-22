import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { LinksModule } from './app/likns/links.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DB,
            autoLoadModels: true,
            sync: {
                alter: true,
            },
            logging: (data) => {

            }
        }),
        LinksModule,
    ],
    providers: [],
})
export class AppModule {
}
