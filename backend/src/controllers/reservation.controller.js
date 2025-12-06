const db = require("../config/db");

module.exports = {
  getReservations: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM reservations");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  addReservation: async (req, res) => {
    const { user_name, phone, table_id, time_slot, status } = req.body;
    try {
      await db.query(
        "INSERT INTO reservations (user_name, phone, table_id, time_slot, status) VALUES (?, ?, ?, ?, ?)",
        [user_name, phone, table_id, time_slot, status || "reserved"]
      );
      res.json({ message: "Reservation added" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
