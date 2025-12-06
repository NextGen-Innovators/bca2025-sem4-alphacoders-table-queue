const db = require("../config/db");
const bcrypt = require("bcryptjs");

module.exports = {
  getCustomers: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT id, name, email, role, phone FROM users WHERE role='customer'");
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  },

  createCustomer: async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
      const hashed = await bcrypt.hash(password, 10);
      await db.query(
        "INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, 'customer', ?)",
        [name, email, hashed, phone]
      );
      res.json({ message: "Customer created" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: "Email already exists" });
    }
  },
};
