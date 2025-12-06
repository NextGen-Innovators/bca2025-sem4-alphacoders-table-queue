const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");


router.post("/register", authController.register);
router.post("/login", authController.login);
// auth.routes.js (for quick test)
router.get("/users", (req, res) => {
  const users = require("../config/db").prepare("SELECT id, name, email, role FROM users").all();
  res.json(users);
});



module.exports = router;

