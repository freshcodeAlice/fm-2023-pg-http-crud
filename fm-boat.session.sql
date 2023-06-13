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