const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservation.controller");
const auth = require("../middlewares/auth");

router.get("/", auth("admin"), reservationController.getReservations);
router.post("/", reservationController.addReservation);

module.exports = router;
