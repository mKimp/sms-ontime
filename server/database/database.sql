CREATE DATABASE sms;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO users (user_name, phone_number, user_email, user_password) VALUES ('john', '4088888888','john@pdx.edu', 'john');