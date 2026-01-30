const invoiceRepo = require("../repository/invoice.repository");

class InvoiceController {

  async createInvoice(req, res) {
    try {
      const invoice = await invoiceRepo.createInvoice(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllInvoices(req, res) {
    try {
      const invoices = await invoiceRepo.getAllInvoices();
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getInvoiceById(req, res) {
    try {
      const invoice = await invoiceRepo.getInvoiceById(req.params.id);
      if (!invoice) return res.status(404).json({ message: "Invoice not found" });
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateInvoice(req, res) {
    try {
      const invoice = await invoiceRepo.updateInvoice(req.params.id, req.body);
      res.status(200).json(invoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteInvoice(req, res) {
    try {
      await invoiceRepo.deleteInvoice(req.params.id);
      res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}

module.exports = new InvoiceController();
