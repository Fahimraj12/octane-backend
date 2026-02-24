const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Package = sequelize.define(
  "Package",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    service_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    no_of_sessions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    duration_in_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    mrp_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    discount_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    gst_percentage: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 0,
    },

    selling_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    package_includes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    appointment_slot_minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    appointment_start: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    appointment_end: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    blocked_start: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    blocked_end: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    week_days: {
      type: DataTypes.JSON,   // 👈 store array
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "package",
    timestamps: false,
  }
);

module.exports = Package;