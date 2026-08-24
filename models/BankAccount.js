const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BankAccount = sequelize.define(
  "BankAccount",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    merchantId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    accountHolderName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },

    accountNumber: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    ifscCode: {
      type: DataTypes.STRING(20),
      allowNull: false
    },

    bankName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },

    accountType: {
      type: DataTypes.ENUM(
        "SAVINGS",
        "CURRENT"
      ),
      allowNull: false,
      defaultValue: "SAVINGS"
    },

    isPrimary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    status: {
      type: DataTypes.ENUM(
        "ACTIVE",
        "INACTIVE"
      ),
      allowNull: false,
      defaultValue: "ACTIVE"
    }
  },
  {
    tableName: "bank_accounts",
    timestamps: true
  }
);

module.exports = BankAccount;