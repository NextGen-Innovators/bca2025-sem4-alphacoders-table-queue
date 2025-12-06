const db = require("../config/db");

module.exports = {
  getOrders: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM orders ORDER BY created_at DESC");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  createOrder: async (req, res) => {
    const { table_id, items } = req.body;
    try {
      const created_at = new Date();
      await db.query(
        "INSERT INTO orders (table_id, items, status, created_at) VALUES (?, ?, ?, ?)",
        [table_id, JSON.stringify(items), "pending", created_at]
      );
      res.json({ message: "Order created" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  updateOrderStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
      await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
      res.json({ message: "Order status updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },
};
