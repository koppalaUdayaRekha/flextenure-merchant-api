const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Settlement = sequelize.define(
  "Settlement",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    settlementId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },

    merchantId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false
    },

    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "INR"
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "PROCESSED",
        "FAILED"
      ),
      allowNull: false,
      defaultValue: "PENDING"
    },

    bankAccountId: {
      type: DataTypes.UUID,
      allowNull: true
    },

    settlementDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "settlements",
    timestamps: true
  }
);

module.exports = Settlement;