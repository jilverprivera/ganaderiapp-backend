CREATE SCHEMA IF NOT EXISTS `ganaderiapp` DEFAULT CHARACTER SET utf8 ;
USE `ganaderiapp` ;

CREATE TABLE IF NOT EXISTS `ganaderiapp`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(64) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `ganaderiapp`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `ganaderiapp`.`animal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NULL,
  `serial` INT NULL,
  `created_by` INT NOT NULL,
  `category_id` INT NOT NULL,
  `image_public_id` VARCHAR(255) NULL,
  `image_url` VARCHAR(255) NULL,
  `createdAt` TIMESTAMP NOT NULL,
  `purchased` BIT NOT NULL,
  `sold` BIT NOT NULL,
  `born` BIT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `serie_UNIQUE` (`serial` ASC) VISIBLE,
  INDEX `created_by_idx` (`created_by` ASC) VISIBLE,
  INDEX `type_id_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `ganaderiapp`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `ganaderiapp`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `ganaderiapp`.`purchase` (
  `id` INT NOT NULL,
  `concept` VARCHAR(255) NOT NULL,
  `created_by` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `created_by_idx` (`created_by` ASC) VISIBLE,
  CONSTRAINT `created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `ganaderiapp`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `ganaderiapp`.`purchase_detail` (
  `id` INT NOT NULL,
  `purchase_id` INT NOT NULL,
  `animal_id` INT NOT NULL,
  INDEX `fk_purchase_has_animal_animal1_idx` (`animal_id` ASC) VISIBLE,
  INDEX `fk_purchase_has_animal_purchase1_idx` (`purchase_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_purchase_has_animal_purchase1`
    FOREIGN KEY (`purchase_id`)
    REFERENCES `ganaderiapp`.`purchase` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_purchase_has_animal_animal1`
    FOREIGN KEY (`animal_id`)
    REFERENCES `ganaderiapp`.`animal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `ganaderiapp`.`sale` (
  `id` INT NOT NULL,
  `concept` VARCHAR(255) NOT NULL,
  `created_by` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `created_by_idx` (`created_by` ASC) VISIBLE,
  CONSTRAINT `created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `ganaderiapp`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE IF NOT EXISTS `ganaderiapp`.`sale_detail` (
  `id` INT NOT NULL,
  `sale_id` INT NOT NULL,
  `animal_id` INT NOT NULL,
  INDEX `fk_sale_has_animal_animal1_idx` (`animal_id` ASC) VISIBLE,
  INDEX `fk_sale_has_animal_sale1_idx` (`sale_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_sale_has_animal_sale1`
    FOREIGN KEY (`sale_id`)
    REFERENCES `ganaderiapp`.`sale` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_has_animal_animal1`
    FOREIGN KEY (`animal_id`)
    REFERENCES `ganaderiapp`.`animal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);