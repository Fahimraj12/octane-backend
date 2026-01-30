const Member = require("./Member");
const Invoice = require("./Invoice");
const Payment = require("./Payment");

// Member -> Invoice
Member.hasMany(Invoice, { foreignKey: "memberId" });
Invoice.belongsTo(Member, { foreignKey: "memberId" });

// Invoice -> Payment
Invoice.hasMany(Payment, { foreignKey: "invoiceId" });
Payment.belongsTo(Invoice, { foreignKey: "invoiceId" });

module.exports = {
  Member,
  Invoice,
  Payment
};
