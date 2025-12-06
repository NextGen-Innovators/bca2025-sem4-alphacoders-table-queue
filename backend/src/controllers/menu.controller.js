const db = require("../config/db");

module.exports = {
  getMenu: (req, res) => {
    const menu = db.prepare("SELECT * FROM menu").all();
    res.json(menu);
  },

  addMenuItem: (req, res) => {
    const { name, price, description, photo } = req.body;
    try {
      db.prepare("INSERT INTO menu (name, price, description, photo) VALUES (?, ?, ?, ?)")
        .run(name, price, description, photo);
      res.json({ message: "Menu item added" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getPopularDishes: () => {
    // Example: return top 5 dishes by some logic, or just return all
    return db.prepare("SELECT * FROM menu LIMIT 5").all();
  }
};
