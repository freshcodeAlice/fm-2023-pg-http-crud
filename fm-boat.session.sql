CREATE TABLE boats (
    id serial PRIMARY KEY,
    name varchar(300) NOT NULL CHECK (name != ''),
    is_sea_able boolean,
    created_at date NOT NULL CHECK (created_at < current_date),
    water_displacement int CHECK (water_displacement > 0),
    max_speed int NOT NULL
);

/*
INSERT INTO boats (
    name,
    is_sea_able,
    created_at,
    water_displacement,
    max_speed
  )
VALUES (
    'name:character varying',
    is_sea_able:boolean,
    'created_at:date',
    water_displacement:integer,
    max_speed:integer
  );


{
  attr1: v1,
  attr2: v2,
  attr3: v2
}

UPDATE boats
SET attr1 = v1,
  attr2='v2',
  attr3=v3
WHERE
  id = 1;

*/

SELECT * FROM boats;

DROP TABLE boats;

CREATE TABLE boats (
    id serial PRIMARY KEY,
    name varchar(300) NOT NULL CHECK (name != ''),
    owner_id int NOT NULL REFERENCES users(id),
    is_sea_able boolean,
    created_at date NOT NULL CHECK (created_at < current_date),
    water_displacement int CHECK (water_displacement > 0),
    max_speed int NOT NULL
);

CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name varchar(300) NOT NULL CHECK (first_name != ''),
  last_name varchar(300) NOT NULL CHECK (last_name != ''),
  email varchar(300 ) NOT NULL CHECK (email != ''),
  boat_license int 
);

DELETE FROM boats;


ALTER TABLE boats
ADD COLUMN owner_id int REFERENCES users(id);



INSERT INTO boats (
    name,
    is_sea_able,
    created_at,
    water_displacement,
    max_speed,
    owner_id
  )
VALUES (
    'name',
    true,
    '1990-01-01',
    200,
   300,
   1
  );

  INSERT INTO users (first_name, last_name, email, boat_license)
  VALUES (

      'test',
      'test2',
      'mail@l',
      234234
    );