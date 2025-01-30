import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

export class Flight extends Model {
  public id!: number;
  public name!: string;
  public departure!: string;
  public arrival!: string;
  public price!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Flight.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrival: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Flight',
    tableName: 'flights',
    timestamps: true,
  }
);
