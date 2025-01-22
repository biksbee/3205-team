import { Column, DataType, HasMany, Model, Sequelize, Table } from 'sequelize-typescript';
import { IpAddressesModel } from './ip-addresses.model';

@Table({
    tableName: 'links',
    timestamps: true,
    comment: 'Таблица с ссылками'
})
export class LinksModel extends Model<LinksModel> {
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    originalUrl: string;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    shortUrl: string;

    @Column({type: DataType.INTEGER, defaultValue: 0})
    clickCount: number;

    @Column({type: DataType.DATE, allowNull: false})
    expiresAt: Date;

    @Column({type: DataType.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')})
    createdAt: Date;

    @HasMany(() => IpAddressesModel)
    ips: IpAddressesModel[]
}