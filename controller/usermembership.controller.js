const UserMembershipRepository = require("../repository/usermembership.repository");
const MembershipPackage = require("../models/MembershipPackage");
const { Op } = require("sequelize");
const UserMembership = require("../models/UserMembership");

// CREATE USER MEMBERSHIP
exports.createUserMembership = async (req, res) => {
  try {
    const {
      member_id,
      membershippackage_id,
      status,
      start_at,
      end_at,
      payment_history,
      trainer_assigned,
    } = req.body;

    if (!member_id || !membershippackage_id || !start_at || !end_at) {
      return res.status(400).json({
        status: "fail",
        message: "Required fields missing",
      });
    }

    // Get package price from DB
    const packageData = await MembershipPackage.findByPk(
      membershippackage_id
    );

    if (!packageData) {
      return res.status(404).json({
        status: "fail",
        message: "Membership package not found",
      });
    }

    const packagePrice =
      parseFloat(packageData.selling_price || packageData.price || 0);

    // Calculate total from payment history
    const totalPaid = (payment_history || []).reduce(
      (total, payment) => total + parseFloat(payment.amount || 0),
      0
    );

    // Prevent overpayment
    if (totalPaid > packagePrice) {
      return res.status(400).json({
        status: "fail",
        message: "Total paid amount exceeds package price",
      });
    }

    const response =
      await UserMembershipRepository.createUserMembership({
        member_id,
        membershippackage_id,
        status: status || "active",
        start_at,
        end_at,
        amount_paid: totalPaid,
        payment_history: payment_history || [],
        trainer_assigned: trainer_assigned || "no",
      });

    if (response.status !== "success") {
      return res.status(500).json(response);
    }

    res.status(201).json(response);

  } catch (error) {
    console.log("Create Membership Error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// GET ALL
exports.getAllUserMemberships = async (req, res) => {
  try {
    const response =
      await UserMembershipRepository.getAllUserMemberships();

    if (response.status !== "success") {
      return res.status(500).json(response);
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// GET BY ID
exports.getUserMembershipById = async (req, res) => {
  try {
    const { id } = req.params;

    const response =
      await UserMembershipRepository.getUserMembershipById(id);

    if (response.status === "fail") {
      return res.status(404).json(response);
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// UPDATE
exports.updateUserMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_history } = req.body;

    const membership =
      await UserMembershipRepository.getUserMembershipById(id);

    if (membership.status !== "success") {
      return res.status(404).json(membership);
    }

    const packageData = await MembershipPackage.findByPk(
      membership.result.membershippackage_id
    );

    const packagePrice =
      parseFloat(packageData.selling_price || packageData.price || 0);

    const totalPaid = (payment_history || []).reduce(
      (total, payment) => total + parseFloat(payment.amount || 0),
      0
    );

    if (totalPaid > packagePrice) {
      return res.status(400).json({
        status: "fail",
        message: "Total paid exceeds package price",
      });
    }

    const response =
      await UserMembershipRepository.updateUserMembership(id, {
        ...req.body,
        amount_paid: totalPaid,
      });

    res.status(200).json(response);

  } catch (error) {
    console.log("Update Membership Error:", error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// DELETE
exports.deleteUserMembership = async (req, res) => {
  try {
    const { id } = req.params;

    const response =
      await UserMembershipRepository.deleteUserMembership(id);

    if (response.status === "fail") {
      return res.status(404).json(response);
    }

    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// expiring memberships

exports.getExpiringMemberships = async (req, res) => {
  try {
    // Convert today to YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    const next29Days = new Date();
    next29Days.setDate(next29Days.getDate() + 29);
    const nextDateFormatted = next29Days.toISOString().split("T")[0];

    const memberships = await UserMembership.findAll({
      where: {
        end_at: {
          [Op.between]: [today, nextDateFormatted],
        },
        status: "active",
      },
      order: [["end_at", "ASC"]],
    });

    return res.status(200).json({
      status: "success",
      data: memberships,
    });
  } catch (error) {
    console.error("Expiring Membership Error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};