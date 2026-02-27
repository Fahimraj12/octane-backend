const express = require("express");
const router = express.Router();
const packageController = require("../controller/package.controller");
const upload = require("../middleware/uploadPackage");

// Create package
router.post("/", upload.single("image"), packageController.CreatePackage);

// Get all packages
router.get("/", packageController.getPackage);

// Update package
router.put("/:id", upload.single("image"), packageController.updatePackage);

// Delete package
router.delete("/:id", packageController.deletePackage);

module.exports = router;