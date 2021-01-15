
CREATE TABLE "player" (
	"id" INT PRIMARY KEY UNIQUE,
	"name" VARCHAR,
	"position" VARCHAR
);

CREATE TABLE "team" (
	"id" INT PRIMARY KEY UNIQUE,
	"name" VARCHAR,
	"founded" INT
);

CREATE TABLE "player_team"(
	"id" SERIAL PRIMARY KEY,
	"player_id" INT REFERENCES player,
	"team_id" INT REFERENCES team
);


DROP TABLE "fixture";
CREATE TABLE "fixture" (
	"id" INT PRIMARY KEY,
	"date" TIMESTAMP,
	"venue_id" INT
);

CREATE TABLE "team_fixture" (
	"id" SERIAL PRIMARY KEY,
	"team_id" INT REFERENCES team,
	"fixture_id" INT REFERENCES fixture,
	"home" BOOLEAN
);

CREATE TABLE "venue" (
	"id" INT PRIMARY KEY,
	"name" VARCHAR,
	"city" VARCHAR
);

CREATE TABLE "venue_team" (
	"id" SERIAL PRIMARY KEY,
	"venue_id" INT REFERENCES venue,
	"team_id" INT REFERENCES team
);


-- DROP TABLE "user";
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "favorite_team" INT,
    "location" VARCHAR(120)
);

--drop table "rating";
CREATE TABLE "rating"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"fixture_id" INT REFERENCES fixture,
	"player_of_the_match" INT REFERENCES player,
	"comment" VARCHAR (400)
);

-- drop table "rating_data";
CREATE TABLE "rating_data" (
	"id" SERIAL PRIMARY KEY,
	"rating_id" INT REFERENCES rating,
	"team_id" INT REFERENCES team,
	"home" BOOLEAN,
	"atk_rating" INT,
	"df_rating" INT
);