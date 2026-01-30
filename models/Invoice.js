const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Member = require("./Member");

const Invoice = sequelize.define(
  "Invoice",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    invoice_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Member,
        key: "id",
      },
      onDelete: "CASCADE", // agar member delete ho jaye, invoices bhi delete
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("paid", "unpaid", "overdue"),
      allowNull: false,
    },
  },
  {
    tableName: "Invoice",
    timestamps: true,
  }
);

module.exports = Invoice;
