\c deniz_proje_dev

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



INSERT INTO publications (content, author, genre_type) VALUES
  (
    'After conservation : let building tell its own story',
    '2017',
    'https://docs.google.com/document/d/e/2PACX-1vQVszL_SG9NyK5A6mXpb-g7opZmIXlRzxUuTJB5Ehl3IICL8YPtup5wB5XhxkzipTm8J88UAe451cAI/pub?embedded=true'
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


INSERT INTO pendingusers (password, repassword, fullname, role, email) VALUES
  (
    '123456',
    '123456',
    'blabla',
    'user',
    'blabla@blabla.com'
  );


INSERT INTO users (password, repassword, fullname, role, email) VALUES
  (
    '123456',
    '123456',
    'denizska',
    'admin',
    'hello@world.com'
  ),
  (
    '123456',
    '123456',
    'yanina',
    'user',
    'yanina@world.com'
  );


