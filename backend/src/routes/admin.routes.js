// =============================
// FILE: src/routes/admin.routes.js
// =============================
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const db = require("../config/db");


// Admin view all reservations
router.get("/reservations", auth("admin"), (req, res) => {
const reservations = db.prepare("SELECT * FROM reservations").all();
res.json(reservations);
});


// Admin view all users
router.get("/users", auth("admin"), (req, res) => {
const users = db.prepare("SELECT id, name, email, role, phone FROM users").all();
res.json(users);
});


module.exports = router;