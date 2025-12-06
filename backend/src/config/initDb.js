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

    // Add missing column `phone` if not exists
    await db.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS tables (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        capacity INT,
        status ENUM('available','reserved','occupied','cleaning') DEFAULT 'available'
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

    console.log("Admin and customer users ensured.");

    // // 6️⃣ Insert dummy menu items if not exists
    // await db.query(`
    //   INSERT INTO menu (name, price, description, image)
    //   SELECT * FROM (SELECT 'Pizza', 12.99, 'Delicious cheese pizza', 'pizza.jpg') AS tmp
    //   WHERE NOT EXISTS (
    //     SELECT name FROM menu WHERE name = 'Pizza'
    //   ) LIMIT 1;
    // `);

    // await db.query(`
    //   INSERT INTO menu (name, price, description, image)
    //   SELECT * FROM (SELECT 'Burger', 9.99, 'Juicy beef burger', 'burger.jpg') AS tmp
    //   WHERE NOT EXISTS (
    //     SELECT name FROM menu WHERE name = 'Burger'
    //   ) LIMIT 1;
    // `);

    // await db.query(`
    //   INSERT INTO menu (name, price, description, image)
    //   SELECT * FROM (SELECT 'Pasta', 11.99, 'Creamy Alfredo pasta', 'pasta.jpg') AS tmp
    //   WHERE NOT EXISTS (
    //     SELECT name FROM menu WHERE name = 'Pasta'
    //   ) LIMIT 1;
    // `);

    console.log("Dummy menu items ensured.");
    console.log("Database setup finished.");

    return db;
  } catch (err) {
    console.error("DB Setup Error:", err);
  }
}

module.exports = initDb;
