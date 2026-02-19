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

// CREATE user membership
exports.createUserMembership = async (req, res) => {
  try {
    const { name, email, mobile, membership_type, status, start_at, end_at, amount_paid, payment_method, trainer_assigned } = req.body;

    // validation
    if (!name || !email || !mobile || !membership_type || !status || !start_at || !end_at || !amount_paid || !payment_method) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const response = await UserMembershipRepository.createUserMembership({
      name,
      email,
      mobile,
      membership_type,
      start_at,
      end_at,
      status,
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