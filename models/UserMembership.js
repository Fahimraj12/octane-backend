const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const MembershipPackage = require("./MembershipPackage");

const UserMembership = sequelize.define(
  "UserMembership",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    membershippackage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MembershipPackage,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
    },
    start_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount_paid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM('cash', 'card', 'online'),
      allowNull: false,
    },
    trainer_assigned: {
      type: DataTypes.ENUM('yes', 'no'),
      allowNull: true,
    },
    payment_history: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "UserMemberships", // ✅ correct table
    timestamps: false,
  },
);

module.exports = UserMembership;