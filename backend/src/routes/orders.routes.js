const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");
const auth = require("../middlewares/auth");

// Admin routes
router.get("/", auth("admin"), ordersController.getOrders);
router.put("/:id", auth("admin"), ordersController.updateOrderStatus);

// Customer routes
router.get("/customer", auth("customer"), ordersController.getCustomerOrders);
router.post("/", auth("customer"), ordersController.createOrder);

module.exports = router;
