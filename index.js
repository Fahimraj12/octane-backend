const express = require("express");
const sequelize = require("./config/database");
require("dotenv").config();
// const dropTables = require("./config/dropTables");
const adminRouter = require('./routes/admin.routes');

// import models (IMPORTANT)
require("./models/Admin");
const app = express();
app.use(express.json());
app.use("/admin", adminRouter);

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
