const db4 = require("../config/db");
module.exports = {
addQueue: (req, res) => {
const { user_name, phone } = req.body;


const last = db4.prepare("SELECT MAX(position) as maxPos FROM queue").get();
const pos = (last.maxPos || 0) + 1;


db4.prepare(
"INSERT INTO queue (user_name, phone, position, status) VALUES (?, ?, ?, ?)"
).run(user_name, phone, pos, "waiting");


res.json({ message: "Added to queue", position: pos });
},


getQueue: (req, res) => {
const rows = db4.prepare("SELECT * FROM queue ORDER BY position ASC").all();
res.json(rows);
},


removeQueue: (req, res) => {
const { id } = req.params;
db4.prepare("DELETE FROM queue WHERE id = ?").run(id);
res.json({ message: "Removed from queue" });
},
};