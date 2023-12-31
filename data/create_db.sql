DROP TABLE IF EXISTS climber;

DROP TABLE IF EXISTS friendships;

CREATE TABLE
    IF NOT EXISTS climber (
        id SERIAL PRIMARY KEY,
        username VARCHAR(128),
        email VARCHAR(128),
        password VARCHAR(255)
    );

CREATE TABLE
    IF NOT EXISTS friendships (
        id SERIAL PRIMARY KEY,
        climber_id INT,
        friend_id INT,
        FOREIGN KEY (climber_id) REFERENCES climber(id),
        FOREIGN KEY (friend_id) REFERENCES climber(id)
    );

CREATE TABLE
    IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        climber_id INT,
        content TEXT,
        post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        image_url TEXT,
        FOREIGN KEY (climber_id) REFERENCES climber(id)
    );

INSERT INTO posts(climber_id, "content") VALUES ($1, $2)

INSERT INTO
    climber (username, email, password)
VALUES (
        'raziuko',
        'raziu@gmail.com',
        '123456'
    ), (
        'melwin',
        'user1@gmail.com',
        'password1'
    ), (
        'jules',
        'user2@gmail.com',
        'password2'
    ), (
        'kevin',
        'user3@gmail.com',
        'password3'
    );