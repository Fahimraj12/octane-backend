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

    // Service Info
    service_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    duration_in_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    no_of_sessions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Pricing
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

    // Image
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    package_includes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // Appointment Settings
    appointment_slot_minutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    appointment_start: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    appointment_end: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    blocked_start: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    blocked_end: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    // Week Days (Stored as JSON)
    week_days: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    // Optional Status
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "package",
    timestamps: false,
  }
);

module.exports = Package;