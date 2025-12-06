const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu.controller");
const auth = require("../middlewares/auth"); // import the function

// Public route to get all menu items
router.get("/", menuController.getMenu);

// Admin route to add menu item
router.post("/add", auth("admin"), menuController.addMenuItem);


// Example: return popular dishes
router.get("/popular-dishes", (req, res) => {
  try {
    const dishes = menuController.getPopularDishes(); // create this in your controller
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

