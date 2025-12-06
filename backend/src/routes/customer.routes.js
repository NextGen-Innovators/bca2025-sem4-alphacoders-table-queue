// =============================
// FILE: src/routes/customer.routes.js
// =============================
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const db = require("../config/db");


// Customer view available tables
router.get("/tables", auth("customer"), (req, res) => {
const tables = db.prepare("SELECT * FROM tables WHERE status='available'").all();
res.json(tables);
});


// Customer view menu/orders
router.get("/orders", auth("customer"), (req, res) => {
const orders = db.prepare("SELECT * FROM orders WHERE table_id IN (SELECT id FROM tables)").all();
res.json(orders);
});


module.exports = router;