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
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    await db.execute(
      "INSERT INTO menu (name, price, description, image) VALUES (?, ?, ?, ?)",
      [name, price, description, image]
    );
    res.json({ message: "Menu item added", image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update an existing menu item
module.exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : undefined;

  try {
    if (image) {
      await db.execute(
        "UPDATE menu SET name=?, price=?, description=?, image=? WHERE id=?",
        [name, price, description, image, id]
      );
    } else {
      await db.execute(
        "UPDATE menu SET name=?, price=?, description=? WHERE id=?",
        [name, price, description, id]
      );
    }
    res.json({ message: "Menu item updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a menu item
module.exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM menu WHERE id=?", [id]);
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get popular dishes
module.exports.getPopularDishes = async (req, res) => {
  try {
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
};
