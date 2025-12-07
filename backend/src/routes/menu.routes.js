const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu.controller");
const multer = require("multer");
const path = require("path");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Public routes
router.get("/", menuController.getMenu);

// Admin routes
router.post("/add", upload.single("image"), menuController.addMenuItem);
router.put("/:id", upload.single("image"), menuController.updateMenuItem);
router.delete("/:id", menuController.deleteMenuItem);

module.exports = router;
