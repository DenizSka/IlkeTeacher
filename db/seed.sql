\c deniz_proje_dev
-- psql -f db/migrations/migration.sql
-- psql -f db/seeds/seed.sql

INSERT INTO projeler (content, author, genre_type) VALUES
  (
    'Sometimes you win, sometimes you learn.',
    'Unknown',
    'motivational'
  ),
  (
    'Do or do not, there is no try.',
    'Yoda',
    'motivational'
  ),
  (
    'A simple ''Hello'' could lead to a million things.',
    'Unknown',
    'motivational'
  );
