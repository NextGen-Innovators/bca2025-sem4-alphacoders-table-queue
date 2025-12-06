

const express = require("express");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors());


// Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/admin", require("./routes/admin.routes"));
app.use("/customer", require("./routes/customer.routes"));
app.use("/tables", require("./routes/tables.routes"));
app.use("/reservations", require("./routes/reservation.routes"));
app.use("/queue", require("./routes/queue.routes"));
app.use("/orders", require("./routes/orders.routes"));


app.listen(5000, () => console.log("Server running on port 5000"));