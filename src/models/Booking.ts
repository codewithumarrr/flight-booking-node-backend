import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index';

export class Booking extends Model {
  public id!: number;
  public flightId!: number;
  public passengerName!: string;
  public passengerEmail!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    passengerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passengerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
    timestamps: true,
  }
);
