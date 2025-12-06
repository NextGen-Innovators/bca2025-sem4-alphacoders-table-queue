const express = require("express");
const router = express.Router();
const controller = require("../controllers/orders.controller");


router.post("/create", controller.createOrder);
router.get("/", controller.getOrders);
router.put("/status", controller.updateStatus);


module.exports = router;