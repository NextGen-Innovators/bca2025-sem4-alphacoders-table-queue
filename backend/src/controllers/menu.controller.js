const db = require("../config/db");

module.exports = {
  getMenu: async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT * FROM menu");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  addMenuItem: async (req, res) => {
    const { name, price, description, image } = req.body;
    try {
      await db.execute(
        "INSERT INTO menu (name, price, description, image) VALUES (?, ?, ?, ?)",
        [name, price, description, image]
      );
      res.json({ message: "Menu item added" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  getPopularDishes: async (req, res) => {
    try {
      // Count menu items in orders
      const [rows] = await db.execute(`
        SELECT m.id, m.name, m.price, m.description, m.image, COUNT(o.id) AS order_count
        FROM menu m
        LEFT JOIN orders o ON JSON_CONTAINS(o.items, JSON_QUOTE(m.name))
        GROUP BY m.id
        ORDER BY order_count DESC
        LIMIT 5
      `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
