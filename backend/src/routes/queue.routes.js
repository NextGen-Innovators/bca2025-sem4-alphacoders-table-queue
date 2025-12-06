// queue.routes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");
const controller = require("../controllers/queue.controller");


router.post("/add", controller.addQueue);
router.get("/", controller.getQueue);
router.delete("/remove/:id", controller.removeQueue);


// router.post("/add", (req, res) => {
//   const { user_name, phone } = req.body;

//   const last = db.prepare("SELECT MAX(position) as maxPos FROM queue").get();
//   const pos = (last.maxPos || 0) + 1;

//   db.prepare(
//     "INSERT INTO queue (user_name, phone, position, status) VALUES (?, ?, ?, ?)"
//   ).run(user_name, phone, pos, "waiting");

//   res.json({ message: "Added to queue", position: pos });
// });

module.exports = router;

