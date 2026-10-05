-- Create database, user, schema
CREATE DATABASE next_js_example_fall_2026_eu;

CREATE USER next_js_example_fall_2026_eu WITH ENCRYPTED PASSWORD 'next_js_example_fall_2026_eu';

GRANT ALL PRIVILEGES ON DATABASE next_js_example_fall_2026_eu TO next_js_example_fall_2026_eu;

-- \connect  next_js_example_fall_2026_eu

CREATE SCHEMA next_js_example_fall_2026_eu AUTHORIZATION next_js_example_fall_2026_eu;

-- \q

-- Create animals table
CREATE TABLE animals (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(30) NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(45),
  birth_date date NOT NULL
);

-- Insert records into the animals table
INSERT INTO
  animals (
    first_name,
    type,
    accessory,
    birth_date
  )
VALUES
  ('Mochi', 'red panda', 'tiny yellow raincoat', '2021-04-17'),
  ('Biscuit', 'capybara', 'striped bow tie', '2020-11-03'),
  ('Pickle', 'otter', 'round sunglasses', '2022-07-28'),
  ('Noodle', 'alpaca', 'sparkly wizard hat', '2019-02-14'),
  ('Waffles', 'hedgehog', 'miniature backpack', '2023-09-09');
