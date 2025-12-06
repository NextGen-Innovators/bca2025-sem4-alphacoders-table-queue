const db3 = require("../config/db");
module.exports = {
createReservation: (req, res) => {
const { user_name, phone, table_id, time_slot } = req.body;
db3.prepare(
"INSERT INTO reservations (user_name, phone, table_id, time_slot, status) VALUES (?, ?, ?, ?, ?)"
).run(user_name, phone, table_id, time_slot, "reserved");
res.json({ message: "Reservation created" });
},


getReservations: (req, res) => {
const rows = db3.prepare("SELECT * FROM reservations").all();
res.json(rows);
},


updateStatus: (req, res) => {
const { id, status } = req.body;
db3.prepare("UPDATE reservations SET status = ? WHERE id = ?").run(status, id);
res.json({ message: "Status updated" });
},
};