const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = {
register: (req, res) => {
const { name, email, password, role, phone } = req.body;
const hashed = bcrypt.hashSync(password, 10);


try {
db.prepare("INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)")
.run(name, email, hashed, role || "customer", phone);
res.json({ message: "User registered" });
} catch (err) {
res.status(400).json({ error: "Email already exists" });
}
},


login: (req, res) => {
const { email, password } = req.body;
const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);


if (!user) return res.status(400).json({ error: "User not found" });


const match = bcrypt.compareSync(password, user.password);
if (!match) return res.status(400).json({ error: "Wrong password" });


const token = jwt.sign({ id: user.id, role: user.role }, "SECRET123", { expiresIn: "1d" });
res.json({ message: "Logged in", token });
},
};