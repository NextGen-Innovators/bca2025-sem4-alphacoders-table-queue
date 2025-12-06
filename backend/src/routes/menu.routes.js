const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu.controller");

// Public
router.get("/", menuController.getMenu);
router.get("/popular-dishes", menuController.getPopularDishes);

// Admin-only
router.post("/add", menuController.addMenuItem);

module.exports = router;
