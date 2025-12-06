const express = require("express");
const router = express.Router();
const controller = require("../controllers/reservation.controller");


router.post("/create", controller.createReservation);
router.get("/", controller.getReservations);
router.put("/status", controller.updateStatus);

module.exports = router;