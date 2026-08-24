const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Transaction = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    transactionId: {
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
        "SUCCESS",
        "FAILED",
        "REFUNDED",
        "PARTIALLY_REFUNDED"
      ),
      allowNull: false,
      defaultValue: "PENDING"
    },

    paymentMethod: {
      type: DataTypes.STRING(50),
      allowNull: true
    },

    customerName: {
      type: DataTypes.STRING(150),
      allowNull: true
    },

    customerEmail: {
      type: DataTypes.STRING(150),
      allowNull: true
    },

    referenceId: {
      type: DataTypes.STRING(100),
      allowNull: true
    },

    refundAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0
    },

    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "transactions",
    timestamps: true
  }
);

module.exports = Transaction;