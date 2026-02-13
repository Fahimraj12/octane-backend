const PackageRepository = require("../repository/package.repository");

// GET all packages (sirf service_title dikhana)
exports.getPackage = async (req, res) => {
  try {
    const response = await PackageRepository.getAllPackage();

    if (response.status !== "success") {
      return res.status(500).json(response);
    }

    // sirf required data return
    const data = response.result.map(pkg => ({
      id: pkg.id,
      service_title: pkg.service_title,
      title: pkg.title,
      no_of_sessions: pkg.no_of_sessions,
      slots: pkg.slots,
      mrp: pkg.mrp,
      discount: pkg.discount,
      selling_price: pkg.selling_price,
    }));

    res.status(200).json({
      status: "success",
      result: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// CREATE Package
exports.CreatePackage = async (req, res) => {
  try {
    const {
      service_title,
      title,
      no_of_sessions,
      slots,
      mrp,
      discount,
      selling_price,
    } = req.body;

    // validation
    if (
      !service_title ||
      !title ||
      !no_of_sessions ||
      !slots ||
      !mrp ||
      discount === undefined ||
      !selling_price
    ) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    const response = await PackageRepository.createPackage({
      service_title,
      title,
      no_of_sessions,
      slots,
      mrp,
      discount,
      selling_price,
    });

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// UPDATE Package
exports.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await PackageRepository.updatePackage(id, req.body);

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

// DELETE Package
exports.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await PackageRepository.deletePackage(id);

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
