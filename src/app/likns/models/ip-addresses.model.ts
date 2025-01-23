import { BelongsTo, Column, DataType, ForeignKey, Model, Sequelize, Table } from 'sequelize-typescript';
import { LinksModel } from './links.model';

@Table({
  tableName: 'ip-addresses',
  timestamps: true,
  comment: 'Таблица с ip адресами'
})
export class IpAddressesModel extends Model<IpAddressesModel> {
  @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true})
  id: number;

  @Column({type: DataType.STRING, allowNull: false})
  ip: string;

  @Column({type: DataType.STRING})
  fingerprint: string;

  @Column({type: DataType.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')})
  createdAt: Date;

  @ForeignKey(() => LinksModel)
  @Column({type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE'})
  linkId: number;

  @BelongsTo(() => LinksModel)
  link: LinksModel
}