import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class Books extends Model<any> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: '_id',
  })
  _id: number;
  
  @Column
  title: string;

  @Column
  author: string;

  @Column({
    type: DataType.TEXT,
    field: 'description'
  })
  description: string;

  @Column
  price: number;

  @Column({
    type: DataTypes.TEXT,
    field: 'cover'
  })
  cover: string;
}