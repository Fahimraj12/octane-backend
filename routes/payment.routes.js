const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment.controller");

// Payment create
router.post("/", paymentController.createPayment.bind(paymentController));

// Get all payments with invoice + member info
router.get("/", paymentController.getAllPayments.bind(paymentController));

// Get single payment by id
router.get("/:id", paymentController.getPaymentById.bind(paymentController));

module.exports = router;