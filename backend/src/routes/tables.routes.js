const express = require("express");
const router = express.Router();
const controller = require("../controllers/tables.controller");


router.get("/", controller.getTables);
router.post("/create", controller.createTable);
router.put("/status", controller.updateStatus);

module.exports = router;