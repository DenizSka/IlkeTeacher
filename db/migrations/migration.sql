\c deniz_proje_dev
-- psql -f db/migrations/migration.sql
-- psql -f db/seeds/seed.sql

DROP TABLE IF EXISTS projeler;

CREATE TABLE projeler (
  id SERIAL PRIMARY KEY,
  content TEXT,
  author VARCHAR(255),
  genre_type VARCHAR(255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON projeler (author);



DROP TABLE IF EXISTS publications;

CREATE TABLE publications (
  id SERIAL PRIMARY KEY,
  content TEXT,
  author VARCHAR(255),
  genre_type VARCHAR(255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON publications (author);
