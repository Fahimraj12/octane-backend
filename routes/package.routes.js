const express = require("express");
const router = express.Router();
const packageController = require("../controller/package.controller");

// Create package
router.post("/", packageController.CreatePackage);

// Get all packages
router.get("/", packageController.getPackage);

// Update package
router.put("/:id", packageController.updatePackage);

// Delete package
router.delete("/:id", packageController.deletePackage);

module.exports = router;
