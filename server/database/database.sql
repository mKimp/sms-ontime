CREATE DATABASE sms;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

INSERT INTO users (user_name, phone_number, user_email, user_password) VALUES ('john', '4088888888','john@pdx.edu', 'john');

CREATE TABLE user_contacts (
    phone_id SERIAL,
    user_id SERIAL,
    contact_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    PRIMARY KEY (phone_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

--fake contact
INSERT INTO user_contacts (user_id, contact_name, contact_number) VALUES ('1', 'kim', '0011111');