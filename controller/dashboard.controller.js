const { Op, fn, col } = require("sequelize");
const Admin = require("../models/Admin");
const Trainer = require("../models/Trainer");

exports.getDashboardOverview = async (req, res) => {
  try {
    // ===== COUNTS =====
    const totalAdmins = await Admin.count();
    const totalTrainers = await Trainer.count();

    const activeTrainers = await Trainer.count({
      where: { status: "Active" },
    });

    const inactiveTrainers = await Trainer.count({
      where: { status: "Inactive" },
    });

    // ===== GENDER DISTRIBUTION =====
    const genderStatsRaw = await Trainer.findAll({
      attributes: ["gender", [fn("COUNT", col("gender")), "count"]],
      group: ["gender"],
    });

    const genderStats = genderStatsRaw.map((g) => ({
      gender: g.gender,
      count: g.getDataValue("count"),
    }));

    // ===== MONTHLY JOINING =====
    const monthlyJoinRaw = await Trainer.findAll({
      attributes: [
        [fn("MONTH", col("date_of_joining")), "month"],
        [fn("COUNT", col("id")), "count"],
      ],
      group: [fn("MONTH", col("date_of_joining"))],
      order: [[fn("MONTH", col("date_of_joining")), "ASC"]],
    });

    const monthlyJoining = monthlyJoinRaw.map((m) => ({
      month: m.getDataValue("month"),
      count: m.getDataValue("count"),
    }));

    return res.status(200).json({
      success: true,
      data: {
        totalAdmins,
        totalTrainers,
        activeTrainers,
        inactiveTrainers,
        genderStats,
        monthlyJoining,
      },
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard overview",
    });
  }
};
