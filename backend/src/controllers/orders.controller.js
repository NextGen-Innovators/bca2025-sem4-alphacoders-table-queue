const db = require("../config/db");

// Helper to get customer ID from auth middleware or request
const getCustomerId = (req) => req.user?.id || null;

module.exports = {
  // Get all orders (admin)
  getOrders: async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT o.*, u.name AS customer_name
        FROM orders o
        LEFT JOIN users u ON o.customer_id = u.id
        ORDER BY o.created_at DESC
      `);

      const orders = rows.map(order => ({
        ...order,
        items: order.items ? JSON.parse(order.items) : []
      }));

      res.json(orders);
    } catch (err) {
      console.error("Get Orders Error:", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // Get orders for a specific customer
  getCustomerOrders: async (req, res) => {
    try {
      const customerId = getCustomerId(req);
      if (!customerId) return res.status(400).json({ error: "Customer not found" });

      const [rows] = await db.query(
        "SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC",
        [customerId]
      );

      const orders = rows.map(order => ({
        ...order,
        items: order.items ? JSON.parse(order.items) : []
      }));

      res.json(orders);
    } catch (err) {
      console.error("Get Customer Orders Error:", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // Create a new order
  createOrder: async (req, res) => {
    const { table_id, items } = req.body;
    const customer_id = getCustomerId(req);

    if (!customer_id) return res.status(400).json({ error: "Customer not found" });

    try {
      const created_at = new Date();
      await db.query(
        "INSERT INTO orders (table_id, customer_id, items, status, created_at) VALUES (?, ?, ?, ?, ?)",
        [table_id, customer_id, JSON.stringify(items), "pending", created_at]
      );
      res.json({ message: "Order created" });
    } catch (err) {
      console.error("Create Order Error:", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  // Update order status (admin)
  updateOrderStatus: async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
      await db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id]);
      res.json({ message: "Order status updated" });
    } catch (err) {
      console.error("Update Order Status Error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }
};
