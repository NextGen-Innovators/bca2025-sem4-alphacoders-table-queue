
const db2 = require("../config/db");
module.exports = {
getTables: (req, res) => {
const tables = db2.prepare("SELECT * FROM tables").all();
res.json(tables);
},


createTable: (req, res) => {
const { name, capacity } = req.body;
db2.prepare("INSERT INTO tables (name, capacity, status) VALUES (?, ?, ?)")
.run(name, capacity, "available");
res.json({ message: "Table created" });
},


updateStatus: (req, res) => {
const { id, status } = req.body;
db2.prepare("UPDATE tables SET status = ? WHERE id = ?").run(status, id);
res.json({ message: "Status updated" });
},
};