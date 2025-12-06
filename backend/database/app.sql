CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
);

CREATE TABLE tables (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  capacity INTEGER,
  status TEXT -- available | reserved | occupied | cleaning
);

CREATE TABLE reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name TEXT,
  phone TEXT,
  table_id INTEGER,
  time_slot TEXT,
  status TEXT
);

CREATE TABLE queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name TEXT,
  phone TEXT,
  position INTEGER,
  status TEXT
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_id INTEGER,
  items TEXT, -- JSON string
  status TEXT,
  created_at TEXT
);


CREATE TABLE IF NOT EXISTS menu (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  image TEXT
);
