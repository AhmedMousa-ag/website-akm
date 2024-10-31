-- Users Table Definition --
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  password TEXT NOT NULL,
  email VARCHAR NOT NULL,
  last_login TIMESTAMP
);
