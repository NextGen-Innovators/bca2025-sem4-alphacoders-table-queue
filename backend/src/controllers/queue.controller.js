const db = require("../config/db");

module.exports = {
  getQueue: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM queue ORDER BY position ASC");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  addToQueue: async (req, res) => {
    const { user_name, phone } = req.body;
    try {
      // Get current max position
      const [result] = await db.query("SELECT MAX(position) AS maxPos FROM queue");
      const position = (result[0].maxPos || 0) + 1;

      await db.query(
        "INSERT INTO queue (user_name, phone, position, status) VALUES (?, ?, ?, ?)",
        [user_name, phone, position, "waiting"]
      );

      res.json({ message: "Added to queue", position });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  removeFromQueue: async (req, res) => {
    const { id } = req.params;
    try {
      await db.query("DELETE FROM queue WHERE id = ?", [id]);
      res.json({ message: "Removed from queue" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
