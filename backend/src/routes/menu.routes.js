const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("../config/db");
const auth = require("../middlewares/auth");


const router = express.Router();

// Ensure upload folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

const upload = multer({ storage });

// =============================
// ADD MENU ITEM (Admin Only)
// =============================
router.post(
  "/menu",
  auth("admin"),
  upload.single("image"),  // image field name
  async (req, res) => {
    try {
      const { name, price, description } = req.body;

      if (!name || !price) {
        return res.status(400).json({ error: "Name and price are required" });
      }

      const image = req.file ? req.file.filename : null;

      const sql = `
        INSERT INTO menu (name, price, description, image)
        VALUES (?, ?, ?, ?)
      `;

      await db.query(sql, [name, price, description, image]);

      res.json({ message: "Menu item added successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// =============================
// GET ALL MENU ITEMS
// =============================
router.get("/menu", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM menu");

    const menu = rows.map((item) => ({
      ...item,
      image: item.image
        ? `http://localhost:5000/uploads/${item.image}`
        : null,
    }));

    res.json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
