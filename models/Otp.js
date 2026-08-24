const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Otp = sequelize.define(
    "Otp",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: true
        },

        otp: {
            type: DataTypes.STRING(10),
            allowNull: false
        },

        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: "otp_verifications",
        timestamps: true
    }
);

module.exports = Otp;