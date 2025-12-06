const express = require("express");
const router = express.Router();
const queueController = require("../controllers/queue.controller");
const auth = require("../middlewares/auth");

router.get("/", auth("admin"), queueController.getQueue);
router.post("/", queueController.addToQueue);
router.delete("/:id", auth("admin"), queueController.removeFromQueue);

module.exports = router;
