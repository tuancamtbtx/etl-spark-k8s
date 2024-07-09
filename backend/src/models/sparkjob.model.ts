import { Table, Column, Model, DataType } from "sequelize-typescript";

interface ActivityAttributes {
    customerId: string;
    productId: string;
    type: string;
    amount: number;
    
}

export class SparkJobModel extends Model<ActivityAttributes> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  customerId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  productId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;
}