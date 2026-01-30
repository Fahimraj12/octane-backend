const { Payment, Invoice, Member } = require("../models");

class PaymentRepository {

  async createPayment(data) {
    return await Payment.create(data);
  }

  async getAllPayments() {
    return await Payment.findAll({
      include: {
        model: Invoice,
        include: {
          model: Member,
          attributes: ['name', 'email', 'mobile', 'status']
        }
      }
    });
  }

  async getPaymentById(id) {
    return await Payment.findByPk(id, {
      include: {
        model: Invoice,
        include: {
          model: Member,
          attributes: ['name', 'email', 'mobile', 'status']
        }
      }
    });
  }
}

module.exports = new PaymentRepository();
