const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");
const auth = require("../middlewares/auth");

router.get("/", auth("admin"), ordersController.getOrders);
router.post("/", ordersController.createOrder);
router.put("/:id", auth("admin"), ordersController.updateOrderStatus);

module.exports = router;
