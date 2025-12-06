const db = require("../config/db");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT id, name, email, role, phone FROM users");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await db.query("DELETE FROM users WHERE id = ?", [id]);
      res.json({ message: "User deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
