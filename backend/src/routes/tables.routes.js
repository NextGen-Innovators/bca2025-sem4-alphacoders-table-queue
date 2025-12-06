const express = require("express");
const router = express.Router();
const tablesController = require("../controllers/tables.controller");

// Public: get all tables
router.get("/", tablesController.getTables);

// Admin-only (assuming you have middleware for auth)
router.post("/", tablesController.addTable);
router.put("/:id", tablesController.updateTable);
router.delete("/:id", tablesController.deleteTable);

module.exports = router;
