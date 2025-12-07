const express = require("express");
const cors = require("cors");
const initDb = require("./config/initDb");

(async () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // Initialize Database & Tables
  await initDb();
  console.log("Database ready!");
  

  // Static folder for images  
  const path = require("path");
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Routes
  app.use("/menu", require("./routes/menu.routes"));
  app.use("/auth", require("./routes/auth.routes"));
  app.use("/admin", require("./routes/admin.routes"));
  app.use("/customer", require("./routes/customer.routes"));
  app.use("/tables", require("./routes/tables.routes"));
  app.use("/reservations", require("./routes/reservation.routes"));
  app.use("/queue", require("./routes/queue.routes"));
  app.use("/orders", require("./routes/orders.routes"));

  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
