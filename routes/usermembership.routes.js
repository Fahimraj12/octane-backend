const express = require("express");
const router = express.Router();
const controller = require("../controller/usermembership.controller.js");

router.post("/add-user-membership", controller.createUserMembership);
router.get("/get-user-memberships", controller.getAllUserMemberships);
router.put("/update-user-membership/:id", controller.updateUserMembership);
router.delete("/delete-user-membership/:id", controller.deleteUserMembership);

module.exports = router;