const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Invoice = require("./Invoice");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    invoiceId: {          // 👈 foreign key to Invoice
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Invoice,
        key: "id",
      },
      onDelete: "CASCADE", // agar invoice delete ho jaye, payment bhi delete
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_mode: {
      type: DataTypes.ENUM('cash', 'upi', 'bank_transfer'),
      allowNull: false,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Payment",
    timestamps: false,
  }
);

module.exports = Payment;
