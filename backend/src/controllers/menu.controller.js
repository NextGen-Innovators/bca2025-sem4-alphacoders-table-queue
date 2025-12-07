const db = require("../config/db");

// Get all menu items
module.exports.getMenu = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM menu");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new menu item
module.exports.addMenuItem = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    await db.execute(
      "INSERT INTO menu (name, price, description, image) VALUES (?, ?, ?, ?)",
      [name, parseFloat(price), description || "", image]
    );

    res.json({ message: "Menu item added", image });
  } catch (err) {
    console.error("Add Menu Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update menu item
module.exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    if (image) {
      await db.execute(
        "UPDATE menu SET name=?, price=?, description=?, image=? WHERE id=?",
        [name, parseFloat(price), description || "", image, id]
      );
    } else {
      await db.execute(
        "UPDATE menu SET name=?, price=?, description=? WHERE id=?",
        [name, parseFloat(price), description || "", id]
      );
    }

    res.json({ message: "Menu item updated" });
  } catch (err) {
    console.error("Update Menu Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete menu item
module.exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM menu WHERE id=?", [id]);
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    console.error("Delete Menu Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
