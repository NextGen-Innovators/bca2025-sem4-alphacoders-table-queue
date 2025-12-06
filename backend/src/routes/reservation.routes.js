// routes/reservation.routes.js
const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller");

router.post("/reserve", reservationController.addReservation);

module.exports = router;
