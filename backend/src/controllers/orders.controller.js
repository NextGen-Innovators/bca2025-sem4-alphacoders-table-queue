const db5 = require("../config/db");
module.exports = {
createOrder: (req, res) => {
const { table_id, items } = req.body;
db5.prepare(
"INSERT INTO orders (table_id, items, status, created_at) VALUES (?, ?, ?, ?)"
).run(table_id, JSON.stringify(items), "pending", new Date().toISOString());


res.json({ message: "Order created" });
},


getOrders: (req, res) => {
const rows = db5.prepare("SELECT * FROM orders").all();
res.json(rows);
},


updateStatus: (req, res) => {
const { id, status } = req.body;
db5.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
res.json({ message: "Order status updated" });
},
};