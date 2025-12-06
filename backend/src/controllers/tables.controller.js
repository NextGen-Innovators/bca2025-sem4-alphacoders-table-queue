const db = require("../config/db");

// ==================== Tables Controller ====================

// Get all tables
module.exports.getTables = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tables");
    res.json(rows);
  } catch (err) {
    console.error("Get Tables Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Add table
module.exports.addTable = async (req, res) => {
  const { name, capacity } = req.body;

  if (!name || !capacity) {
    return res.status(400).json({ error: "Name and capacity are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO tables (name, capacity, status) VALUES (?, ?, 'available')",
      [name, capacity]
    );
    res.json({ message: "Table added", id: result.insertId });
  } catch (err) {
    console.error("Add Table Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update table
module.exports.updateTable = async (req, res) => {
  const { id } = req.params;
  const { name, capacity, status } = req.body;

  if (!name || !capacity) {
    return res.status(400).json({ error: "Name and capacity are required" });
  }

  try {
    const [result] = await db.query(
      "UPDATE tables SET name=?, capacity=?, status=? WHERE id=?",
      [name, capacity, status || "available", id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Table not found" });

    res.json({ message: "Table updated" });
  } catch (err) {
    console.error("Update Table Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete table
module.exports.deleteTable = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM tables WHERE id=?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Table not found" });

    res.json({ message: "Table deleted" });
  } catch (err) {
    console.error("Delete Table Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
