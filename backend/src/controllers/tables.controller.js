const db = require("../config/db");

module.exports = {
  getTables: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM tables");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  addTable: async (req, res) => {
    try {
      const { name, capacity } = req.body;
      if (!name || !capacity) return res.status(400).json({ error: "Name and capacity required" });

      await db.query("INSERT INTO tables (name, capacity) VALUES (?, ?)", [name, capacity]);
      res.json({ message: "Table added" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
