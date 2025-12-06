const db = require("../config/db"); // MySQL connection
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
 register: async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const db = require("../config/db");
    await db.execute(
      "INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashed, role || "customer", phone]
    );
    res.json({ message: "User registered" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ error: "Email already exists" });
    } else {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
},


login: async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = require("../config/db"); // make sure this exports your mysql2 connection
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET123", { expiresIn: "1d" });
    // res.json({ message: "Logged in", token });
    res.json({ message: "Logged in", token, role: user.role });


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
},

};
