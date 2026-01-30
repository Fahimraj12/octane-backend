const express = require("express");
const router = express.Router();
const invoiceController = require("../controller/invoice.controller");

// CRUD routes
router.post("/", invoiceController.createInvoice.bind(invoiceController));
router.get("/", invoiceController.getAllInvoices.bind(invoiceController));
router.get("/:id", invoiceController.getInvoiceById.bind(invoiceController));
router.put("/:id", invoiceController.updateInvoice.bind(invoiceController));
router.delete("/:id", invoiceController.deleteInvoice.bind(invoiceController));

module.exports = router;
