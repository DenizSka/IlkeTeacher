\c deniz_proje_dev
-- psql -f db/migrations/migration.sql
-- psql -f db/seeds/seed.sql

DROP TABLE IF EXISTS projeler;

CREATE TABLE projeler (
  id SERIAL PRIMARY KEY,
  content TEXT,
  year TEXT,
  author TEXT,
  pdf VARCHAR(255),
  image VARCHAR(255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);


-- CREATE INDEX ON projeler (author);



DROP TABLE IF EXISTS publications;

CREATE TABLE publications (
  id SERIAL PRIMARY KEY,
  content TEXT,
  year TEXT,
  author TEXT,
  pdf VARCHAR(255),
  image VARCHAR(255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);


-- CREATE INDEX ON publications (author);

CREATE TABLE pendingusers (
  id SERIAL PRIMARY KEY,
  password TEXT NOT NULL,
  repassword TEXT NOT NULL,
  fullname TEXT,
  role TEXT,
  email VARCHAR(255) UNIQUE,
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

-- CREATE INDEX ON pendingusers (email);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  password TEXT NOT NULL,
  repassword TEXT NOT NULL,
  fullname TEXT,
  role TEXT,
  email VARCHAR(255) UNIQUE,
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

 CREATE INDEX ON users (email);
