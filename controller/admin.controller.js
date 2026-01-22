const adminRepository = require('../repository/admin.repository');

// Create a new admin
exports.CreateAdmin = async (req, res) => {
  try {
    const { name, email, mobile, role, status } = req.body;
    if (!name || !email || !mobile || !role || !status)
      return res
        .status(400)
        .json({ status: "fail", message: "name, email, mobile, role, and status are required" });
    const newAdmin = await adminRepository.createAdmin({ name, email, mobile, role, status });
    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

exports.getAllAdmins = async (req, res) => {
  try {
    const response = await adminRepository.getAllAdmins();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// PUT /admin/:id
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAdmin = await adminRepository.updateAdmin(id, req.body);
    if (!updatedAdmin)
      return res
        .status(404)
        .json({ status: "fail", message: "Admin not found" });

    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// DELETE /admin/:id
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await adminRepository.deleteAdmin(id);
    if (!deleted)
      return res
        .status(404)
        .json({ status: "fail", message: "Admin not found" });

    res.status(200).json({ status: "success", message: "Admin deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};  