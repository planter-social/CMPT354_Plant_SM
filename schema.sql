CREATE DATABASE db354;

/* Run this before creating the table */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE (username)
);


/*** For testing ***/

/* Delete all rows inside users table */
DELETE FROM users;
/* See all rows inside users table */
SELECT * FROM users;