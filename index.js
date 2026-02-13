const express = require("express");
const sequelize = require("./config/database");
require("dotenv").config();
const cors = require("cors");

// const dropTables = require("./config/dropTables");
const adminRouter = require('./routes/admin.routes');
const trainerRouter = require('./routes/trainer.routes');
const memberRouter = require('./routes/member.routes');
const packageRouter = require('./routes/package.routes');
const serviceRouter = require("./routes/service.routes");
const invoiceRouter = require("./routes/invoice.routes");
const paymentRouter = require("./routes/payment.routes");
const inquiriesRouter = require("./routes/inquiries.routes");
const membershippackageRouter = require("./routes/membershippackage.routes");
const usermembershipRouter = require("./routes/usermembership.routes");
const dashboardRoutes = require("./routes/dashboard.routes");


// import models (IMPORTANT)
require("./models/Admin");
require("./models/Trainer");
require("./models/Member");
require('./models/Package');
require("./models/Service");
require("./models/Invoice");
require("./models/Payment");
require("./models/Inquiries");
require("./models/MembershipPackage");
require("./models/UserMembership");
// require associations
// require("./associations");
const app = express();
app.use(express.json());
app.use(cors());
// model
app.use("/api/admin", adminRouter);
app.use("/api/trainer", trainerRouter);
app.use("/api/member", memberRouter);
app.use("/api/package", packageRouter);
app.use("/api/service", serviceRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/membershippackage", membershippackageRouter);
app.use("/api/usermembership", usermembershipRouter);
app.use("/api/dashboard", dashboardRoutes);


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
