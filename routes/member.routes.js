const express = require("express");
const router = express.Router();
const controller = require("../controller/member.controller");

router.get("/get-member", controller.getMember);
router.post("/add-member", controller.createMember);
router.put("/update-member/:id", controller.updateMember);
router.delete("/delete-member/:id", controller.deleteMember);

module.exports = router;
