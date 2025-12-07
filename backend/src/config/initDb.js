const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const DB_NAME = "foodiehub";

async function initDb() {
  try {
    // 1️⃣ Connect to MySQL server without DB
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });
    console.log("Connected to MySQL server.");

    // 2️⃣ Create database if not exists
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    console.log(`Database '${DB_NAME}' ensured.`);

    // 3️⃣ Connect to the actual DB
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
        role ENUM('admin', 'customer') NOT NULL,
        phone VARCHAR(20)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS tables (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        capacity INT NOT NULL,
        status ENUM('available','reserved','occupied','cleaning') DEFAULT 'available',
        date DATETIME NOT NULL,
        hours VARCHAR(50) NOT NULL
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
        status ENUM('pending','completed','cancelled') DEFAULT 'pending',
        created_at DATETIME,
        FOREIGN KEY (table_id) REFERENCES tables(id)
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

    // 5️⃣ Insert dummy users if not exists
    const adminPassword = await bcrypt.hash("admin123", 10);
    const customerPassword = await bcrypt.hash("customer123", 10);

    await db.query(`
      INSERT INTO users (name, email, password, role, phone)
      SELECT * FROM (SELECT 'Admin User', 'admin@restaurant.com', '${adminPassword}', 'admin', '7897897896') AS tmp
      WHERE NOT EXISTS (
        SELECT email FROM users WHERE email = 'admin@restaurant.com'
      ) LIMIT 1;
    `);

    await db.query(`
      INSERT INTO users (name, email, password, role, phone)
      SELECT * FROM (SELECT 'Test Customer', 'customer@restaurant.com', '${customerPassword}', 'customer', '9630125478') AS tmp
      WHERE NOT EXISTS (
        SELECT email FROM users WHERE email = 'customer@restaurant.com'
      ) LIMIT 1;
    `);

    // 6️⃣ Ensure customer_id column exists in orders table
    await db.query(`
      ALTER TABLE orders
      ADD COLUMN IF NOT EXISTS customer_id INT
    `);

    // 7️⃣ Ensure foreign key exists
    const [fkRows] = await db.query(`
      SELECT CONSTRAINT_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = '${DB_NAME}'
        AND TABLE_NAME = 'orders'
        AND COLUMN_NAME = 'customer_id'
        AND REFERENCED_TABLE_NAME = 'users'
    `);

    if (fkRows.length === 0) {
      await db.query(`
        ALTER TABLE orders
        ADD CONSTRAINT fk_customer
        FOREIGN KEY (customer_id) REFERENCES users(id)
      `);
    }

    console.log("Admin and customer users ensured.");
    console.log("Database setup finished.");

    return db;
  } catch (err) {
    console.error("DB Setup Error:", err);
  }
}

module.exports = initDb;
