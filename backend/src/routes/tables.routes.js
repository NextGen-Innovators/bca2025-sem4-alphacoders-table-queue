const express = require("express");
const router = express.Router();
const tablesController = require("../controllers/tables.controller");
const auth = require("../middlewares/auth");

router.get("/", tablesController.getTables);
router.post("/", auth("admin"), tablesController.addTable);

module.exports = router;
