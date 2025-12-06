const db = require("../config/db");

module.exports = {
  // Get all menu items
  getMenu: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM menu");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Add menu item (Admin only)
  addMenuItem: async (req, res) => {
    const { name, price, description, image } = req.body;
    try {
      await db.query(
        "INSERT INTO menu (name, price, description, image) VALUES (?, ?, ?, ?)",
        [name, price, description, image]
      );
      res.json({ message: "Menu item added" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
