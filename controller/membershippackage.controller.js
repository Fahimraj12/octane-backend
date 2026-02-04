const MembershipPackageRepository = require("../repository/membershipackage.repository");

// GET all membership packages
exports.getAllMembershipPackages = async (req, res) => {
  try {
    const response = await MembershipPackageRepository.getAllMembershipPackages();

    if (response.status !== "ok") {
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

// CREATE membership package
exports.createMembershipPackage = async (req, res) => {
  try {
    const {
      name,
      membership_type,
      duration,
      mrp,
      discount,
      selling_price,
      status,
    } = req.body;

    // validation
    if (
      !name ||
      !membership_type ||
      !duration ||
      !mrp ||
      !discount ||
      !selling_price ||
      !status
    ) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const response = await MembershipPackageRepository.createMembershipPackage({
      name,
      membership_type,
      duration,
      mrp,
      discount,
      selling_price,
      status,
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

// UPDATE membership package
exports.updateMembershipPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await MembershipPackageRepository.updateMembershipPackage(
      id,
      req.body
    );
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

// DELETE membership package
exports.deleteMembershipPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await MembershipPackageRepository.deleteMembershipPackage(
      id
    );
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
