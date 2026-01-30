const { Invoice, Member, Payment } = require("../models");

class InvoiceRepository {

  async createInvoice(data) {
    return await Invoice.create(data);
  }

  async getAllInvoices() {
    return await Invoice.findAll({
      include: [
        Member,   // Invoice ka member
        Payment   // Invoice ke payments
      ]
    });
  }

  async getInvoiceById(id) {
    return await Invoice.findByPk(id, {
      include: [
        Member,
        Payment
      ]
    });
  }

  async updateInvoice(id, data) {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) throw new Error("Invoice not found");
    return await invoice.update(data);
  }

  async deleteInvoice(id) {
    const invoice = await Invoice.findByPk(id);
    if (!invoice) throw new Error("Invoice not found");
    return await invoice.destroy();
  }
}

module.exports = new InvoiceRepository();
