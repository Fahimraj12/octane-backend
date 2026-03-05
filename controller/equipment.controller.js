const equipmentRepository = require("../repository/equipment.repository.js");

// Get Equipment
exports.getEquipment = async (req, res) => {
  try {
    const response = await equipmentRepository.getAllEquipment();
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Add Equipment
exports.addEquipment = async (req, res) => {
  try {
    const { title, description, image, status } = req.body;

    if (!title || !description || !image || !status) {
      return res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    }

    const response = await equipmentRepository.createEquipment({
      title,
      description,
      image,
      status,
    });

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
// Update /equipment/:id
exports.updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await equipmentRepository.updateEquipment(id, req.body);
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Delete /equipment/:id
exports.deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await equipmentRepository.deleteEquipment(id);
    if (response.status === "fail") {
      return res.status(404).json(response);
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
};
