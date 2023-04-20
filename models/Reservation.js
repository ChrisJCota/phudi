const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    party_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "restaurant",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "reservation",
  }
);

module.exports = Reservation;
