DROP TABLE IF EXISTS climber;

CREATE TABLE IF NOT EXISTS climber (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(128),
  email VARCHAR(128),
  password VARCHAR(255)
);

INSERT INTO climber (userName, email, password) VALUES
('user1', 'user1@gmail.com', 'password1'),
('user2', 'user2@gmail.com', 'password2'),
('user3', 'user3@gmail.com', 'password3');

