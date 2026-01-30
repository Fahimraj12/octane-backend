const express = require("express");
const sequelize = require("./config/database");
require("dotenv").config();
// const dropTables = require("./config/dropTables");
const adminRouter = require('./routes/admin.routes');
const trainerRouter = require('./routes/trainer.routes');
const memberRouter = require('./routes/member.routes');
const packageRouter = require('./routes/package.routes');
const serviceRouter = require("./routes/service.routes");
const invoiceRouter = require("./routes/invoice.routes");
const paymentRouter = require("./routes/payment.routes");
const inquiriesRouter = require("./routes/inquiries.routes");

// import models (IMPORTANT)
require("./models/Admin");
require("./models/Trainer");
require("./models/Member");
require('./models/Package');
require("./models/Service");
require("./models/Invoice");
require("./models/Payment");
require("./models/Inquiries");
// require associations
// require("./associations");
const app = express();
app.use(express.json());

// model
app.use("/admin", adminRouter);
app.use("/trainer", trainerRouter);
app.use("/member", memberRouter);
app.use("/package", packageRouter);
app.use("/service", serviceRouter);
app.use("/invoice", invoiceRouter);
app.use("/payment", paymentRouter);
app.use("/inquiries", inquiriesRouter);

// test route
app.get("/", (req, res) => {
  res.send("Welcome to Gym Management System API");
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync({ alter: true });
    console.log("✅ Tables created / updated");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  // use only when you want to drop tables
  // dropTables();

})();
