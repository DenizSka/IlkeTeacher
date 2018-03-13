\c deniz_proje_dev

DROP TABLE IF EXISTS projeler;

CREATE TABLE projeler (
  id SERIAL PRIMARY KEY,
  content TEXT,
  author VARCHAR(255),
  genre_type VARCHAR(255),
  date_created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX ON projeler (author);
