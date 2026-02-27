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
      service: pkg.service_category,
      title: pkg.title,
      duration_in_days: pkg.duration_in_days,
      sessions: pkg.no_of_sessions,
      short_description: pkg.short_description,
      mrp_price: pkg.mrp_price,
      discount_price: pkg.discount_price,
      gst_percentage: pkg.gst_percentage,
      package_includes: pkg.package_includes,
      appointment_slot_minutes: pkg.appointment_slot_minutes,
      appointment_start: pkg.appointment_start,
      appointment_end: pkg.appointment_end,
      blocked_start: pkg.blocked_start,
      blocked_end: pkg.blocked_end,
      week_days: pkg.week_days,
      price: pkg.mrp_price
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
    const body = req.body;

    // Parse week_days JSON
    let weekDays = req.body.week_days;

    if (typeof weekDays === "string") {
      weekDays = JSON.parse(weekDays);
    }

    const packageData = {
      service_category: body.service_category,
      title: body.title,
      duration_in_days: body.duration_in_days,
      no_of_sessions: body.no_of_sessions,
      short_description: body.short_description,
      mrp_price: body.mrp_price,
      discount_price: body.discount_price,
      gst_percentage: body.gst_percentage,
      package_includes: body.package_includes,
      appointment_slot_minutes: body.appointment_slot_minutes,
      appointment_start: body.appointment_start,
      appointment_end: body.appointment_end,
      blocked_start: body.blocked_start,
      blocked_end: body.blocked_end,
      week_days: weekDays,
      image: req.file ? req.file.filename : null,
    };

    const response = await PackageRepository.createPackage(packageData);

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
    const body = req.body;

    let weekDays = req.body.week_days;

    if (typeof weekDays === "string") {
      weekDays = JSON.parse(weekDays);
    }

    const updateData = {
      service_category: body.service_category,
      title: body.title,
      duration_in_days: body.duration_in_days,
      no_of_sessions: body.no_of_sessions,
      short_description: body.short_description,
      mrp_price: body.mrp_price,
      discount_price: body.discount_price,
      gst_percentage: body.gst_percentage,
      package_includes: body.package_includes,
      appointment_slot_minutes: body.appointment_slot_minutes,
      appointment_start: body.appointment_start,
      appointment_end: body.appointment_end,
      blocked_start: body.blocked_start,
      blocked_end: body.blocked_end,
      week_days: weekDays,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const response = await PackageRepository.updatePackage(id, updateData);

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