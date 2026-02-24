const UserMembershipRepository = require("../repository/usermembership.repository");

// GET all user memberships
exports.getAllUserMemberships = async (req, res) => {
  try {
    const response = await UserMembershipRepository.getAllUserMemberships();

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
// get by id
exports.getUserMembershipById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await UserMembershipRepository.getUserMembershipById(id);

    if (response.status === "fail") {
      return res.status(404).json(response);
    }

    if (response.status === "error") {
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

// CREATE user membership
exports.createUserMembership = async (req, res) => {
  try {
    const { member_id, membershippackage_id, status, start_at, end_at, amount_paid, payment_method, trainer_assigned } = req.body;

    // validation
    if (!member_id || !membershippackage_id || !status || !start_at || !end_at || !amount_paid || !payment_method) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }
    // calculate total from payment history
    const totalPaid = (payment_history || []).reduce((total, payment) => total + parseFloat(payment.amount), 0);
    if (totalPaid + parseFloat(amount_paid) > membershippackage_id.price) {
      return res.status(400).json({
        status: "fail",
        message: "Amount paid exceeds package price",
      });
    }
    const response = await UserMembershipRepository.createUserMembership({
      member_id,
      membershippackage_id,
      status,
      start_at,
      end_at,
      amount_paid,
      payment_method,
      trainer_assigned,
      createdAt: new Date(),
    });

    if (response.status !== "success") {
      return res.status(500).json(response);
    }

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// UPDATE user membership
exports.updateUserMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_history } = req.body;
    if (payment_history) {
      const totalPaid = payment_history.reduce((total, payment) => total + parseFloat(payment.amount), 0);
      if (totalPaid > req.body.membershippackage_id.price) {
        return res.status(400).json({
          status: "fail",
          message: "Total amount paid exceeds package price",
        });
      }
    }
    const response = await UserMembershipRepository.updateUserMembership(id, req.body);
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

// DELETE user membership
exports.deleteUserMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await UserMembershipRepository.deleteUserMembership(id);
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