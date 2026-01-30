const paymentRepo = require("../repository/payment.repository");

class PaymentController {

  async createPayment(req, res) {
    try {
      const payment = await paymentRepo.createPayment(req.body);
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllPayments(req, res) {
    try {
      const payments = await paymentRepo.getAllPayments();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPaymentById(req, res) {
    try {
      const payment = await paymentRepo.getPaymentById(req.params.id);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = new PaymentController();
