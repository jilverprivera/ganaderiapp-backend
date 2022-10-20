CREATE DATABASE ganaderiapp
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
	


-- PERSON TABLE
CREATE TABLE person(
	id SERIAL NOT NULL UNIQUE,
	name VARCHAR(32) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(128) NOT NULL,
	super_user BOOLEAN NOT NULL DEFAULT FALSE,
	image_url VARCHAR(255) NOT NULL,
	image_public_id VARCHAR(255) NOT NULL,
	
	PRIMARY KEY(id)
);


-- ANIMAL TABLE
CREATE TABLE animal(
	id SERIAL NOT NULL UNIQUE, -- PK
	person_id SERIAL NOT NULL, -- FK
	name VARCHAR(32),
	serie NUMERIC,
	gender_id SERIAL NOT NULL, -- FK
	category_id SERIAL NOT NULL, -- FK
	type_id SERIAL NOT NULL, -- FK
	image_url VARCHAR(255),
	image_public_id VARCHAR(255),
	
	created_at TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NOT NULL,

	PRIMARY KEY(id),
	FOREIGN KEY(person_id) REFERENCES person(id),
	FOREIGN KEY(gender_id) REFERENCES animal_gender(id),
	FOREIGN KEY(category_id) REFERENCES animal_category(id),
	FOREIGN KEY(type_id) REFERENCES animal_type(id)
);

CREATE TABLE animal_gender(
	id SERIAL NOT NULL UNIQUE, -- PK
	gender VARCHAR(32) NOT NULL UNIQUE,

	PRIMARY KEY(id)
);

CREATE TABLE animal_category(
	id SERIAL NOT NULL UNIQUE, -- PK
	name VARCHAR(32) NOT NULL UNIQUE,
	
	PRIMARY KEY(id)
);

CREATE TABLE animal_type(
	id SERIAL NOT NULL UNIQUE, -- PK
	name VARCHAR(32) NOT NULL UNIQUE,
	category_id SERIAL NOT NULL,
	
	PRIMARY KEY(id),
	FOREIGN KEY(category_id) REFERENCES animal_category(id)
);

CREATE TABLE animal_detail(
	id SERIAL NOT NULL UNIQUE, -- PK
	born BOOLEAN NOT NULL DEFAULT FALSE,
	born_date TIMESTAMP,
	born_mom_id SERIAL,
	born_dad_id SERIAL,
	purchased BOOLEAN NOT NULL DEFAULT FALSE,
	purchased_date TIMESTAMP,
	purchased_price NUMERIC,
	purchased_weight NUMERIC,
	sold BOOLEAN NOT NULL DEFAULT FALSE,
	sold_date TIMESTAMP,
	sold_price NUMERIC,
	sold_weight NUMERIC,

	PRIMARY KEY(id),
	FOREIGN KEY(born_dad_id) REFERENCES animal(id),
	FOREIGN KEY(born_mom_id) REFERENCES animal(id)
);

CREATE TABLE sale(
	id SERIAL NOT NULL UNIQUE, --PK
	concept VARCHAR(255) NOT NULL,
	total NUMERIC NOT NULL,
	created_by SERIAL NOT NULL,
	
	PRIMARY KEY(id),
	FOREIGN KEY(created_by) REFERENCES person(id)
);

CREATE TABLE sale_detail(
	id SERIAL NOT NULL UNIQUE, --PK
	sale_id SERIAL NOT NULL, -- FK
	animal_id SERIAL NOT NULL, -- FK
	
	PRIMARY KEY(id),
	FOREIGN KEY(sale_id) REFERENCES sale(id),
	FOREIGN KEY(animal_id) REFERENCES animal(id)
);


CREATE TABLE purchase(
	id SERIAL NOT NULL UNIQUE, --PK
	concept VARCHAR(255) NOT NULL,
	total NUMERIC NOT NULL,
	created_by SERIAL NOT NULL,
	
	PRIMARY KEY(id),
	FOREIGN KEY(created_by) REFERENCES person(id)
);

CREATE TABLE purchase_detail(
	id SERIAL NOT NULL UNIQUE, --PK
	purchase_id SERIAL NOT NULL, -- FK
	animal_id SERIAL NOT NULL, -- FK
	
	PRIMARY KEY(id),
	FOREIGN KEY(purchase_id) REFERENCES purchase(id),
	FOREIGN KEY(animal_id) REFERENCES animal(id)
);


SELECT * FROM information_schema.tables;
SELECT * FROM information_schema.tables WHERE table_catalog = 'ganaderiapp' AND table_schema = 'public';

INSERT INTO person(name, email, password, super_user)
VALUES
	('Jilver', 'Jilverrivera1@gmail.com', '99062511563', TRUE);