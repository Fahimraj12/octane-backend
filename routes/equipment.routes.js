const express = require("express");
const router = express.Router();
const controller = require("../controller/equipment.controller.js");

router.post("/add-equipment", controller.addEquipment);
router.get("/get-equipment", controller.getEquipment);
router.put("/update-equipment/:id", controller.updateEquipment);
router.delete("/delete-equipment/:id", controller.deleteEquipment);

module.exports = router;
