const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const auth = require("../middlewares/auth");

router.get("/", auth("admin"), customerController.getCustomers);
router.post("/", auth("admin"), customerController.createCustomer);

module.exports = router;
