// controllers/reservation.controller.js
const db = require("../config/db");

// Add reservation
module.exports.addReservation = async (req, res) => {
  const { table_id, user_name, phone } = req.body;

  if (!table_id || !user_name || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if table is already reserved
    const [table] = await db.query("SELECT * FROM tables WHERE id=?", [table_id]);
    if (!table[0]) return res.status(404).json({ error: "Table not found" });
    if (table[0].status === "reserved") {
      return res.status(400).json({ error: "Table already reserved" });
    }

    // Insert reservation
    await db.query(
      "INSERT INTO reservations (table_id, user_name, phone, status) VALUES (?, ?, ?, 'reserved')",
      [table_id, user_name, phone]
    );

    // Update table status
    await db.query("UPDATE tables SET status='reserved' WHERE id=?", [table_id]);

    res.json({ message: "Table reserved successfully" });
  } catch (err) {
    console.error("Add Reservation Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
