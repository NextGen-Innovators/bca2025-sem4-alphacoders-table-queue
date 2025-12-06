const mysql = require("mysql2/promise");

// Change these as needed
const DB_NAME = "restaurant_db";

async function initDb() {
  try {
    // 1️⃣ Connect without specifying database (to create DB)
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });

    console.log("Connected to MySQL server.");

    // 2️⃣ Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    console.log(`Database '${DB_NAME}' ensured.`);

    // 3️⃣ Connect to actual DB
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: DB_NAME,
    });

    console.log(`Connected to database '${DB_NAME}'.`);

    // 4️⃣ Create tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        role VARCHAR(50)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS tables (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        capacity INT,
        status ENUM('available', 'reserved', 'occupied', 'cleaning') DEFAULT 'available'
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255),
        phone VARCHAR(20),
        table_id INT,
        time_slot VARCHAR(100),
        status VARCHAR(50)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS queue (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(255),
        phone VARCHAR(20),
        position INT,
        status VARCHAR(50)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        table_id INT,
        items TEXT,
        status VARCHAR(50),
        created_at DATETIME
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS menu (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        image VARCHAR(255)
      );
    `);

    console.log("All tables ensured.");

    // 5️⃣ Insert Dummy Users If Not Exists
    await db.query(`
      INSERT IGNORE INTO users (id, name, email, password, role) VALUES
      (1, 'Admin User', 'admin@gmail.com', '$2b$10$5djbYZnYsUhxU...', 'admin'),
      (2, 'Test Customer', 'customer@gmail.com', '$2b$10$5djbYZnYsUhxU...', 'customer');
    `);

    console.log("Dummy users inserted (if not already present).");

    // 6️⃣ Insert Dummy Menu Items
    await db.query(`
      INSERT INTO menu (name, price, description, image)
      SELECT * FROM (SELECT
        'Chicken Mo:Mo', 150.00, 'Steamed momo with chutney', 'momo.jpg'
      ) AS tmp
      WHERE NOT EXISTS (SELECT id FROM menu LIMIT 1);
    `);

    console.log("Dummy menu inserted (only once).");

    console.log("Database setup finished.");

    return db;

  } catch (err) {
    console.error("DB Setup Error:", err);
  }
}

module.exports = initDb;
