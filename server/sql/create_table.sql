-- MySQL Script generated by MySQL Workbench
-- Sat Nov 19 18:01:31 2016
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema stock_price
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `stock_price` ;

-- -----------------------------------------------------
-- Schema stock_price
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stock_price` DEFAULT CHARACTER SET utf8 ;
USE `stock_price` ;

-- -----------------------------------------------------
-- Table `stock_price`.`grade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock_price`.`grade` ;

CREATE TABLE IF NOT EXISTS `stock_price`.`grade` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock_price`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock_price`.`user` ;

CREATE TABLE IF NOT EXISTS `stock_price`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `grade_id` INT NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_user_grade1_idx` (`grade_id` ASC),
  CONSTRAINT `fk_user_grade1`
    FOREIGN KEY (`grade_id`)
    REFERENCES `stock_price`.`grade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock_price`.`keyword`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock_price`.`keyword` ;

CREATE TABLE IF NOT EXISTS `stock_price`.`keyword` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `keyword_list` VARCHAR(500) NOT NULL DEFAULT '',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock_price`.`stock`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock_price`.`stock` ;

CREATE TABLE IF NOT EXISTS `stock_price`.`stock` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `srt_code` VARCHAR(45) NOT NULL,
  `issue_code` VARCHAR(45) NOT NULL,
  `kor_name` VARCHAR(45) NOT NULL,
  `kor_abbr` VARCHAR(45) NOT NULL,
  `keyword_id` INT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `market` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_stock_keyword1_idx` (`keyword_id` ASC),
  CONSTRAINT `fk_stock_keyword1`
    FOREIGN KEY (`keyword_id`)
    REFERENCES `stock_price`.`keyword` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock_price`.`prediction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock_price`.`prediction` ;

CREATE TABLE IF NOT EXISTS `stock_price`.`prediction` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `stock_id` INT NOT NULL,
  `will_up` INT NOT NULL,
  `today_price` VARCHAR(45) NOT NULL,
  `result_price` VARCHAR(45) NULL,
  `result` INT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_prediction_user_idx` (`user_id` ASC),
  INDEX `fk_prediction_stock1_idx` (`stock_id` ASC),
  CONSTRAINT `fk_prediction_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `stock_price`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_prediction_stock1`
    FOREIGN KEY (`stock_id`)
    REFERENCES `stock_price`.`stock` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stock_price`.`ranking`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `stock_price`.`ranking` ;

CREATE TABLE IF NOT EXISTS `stock_price`.`ranking` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `ranking` INT NOT NULL,
  `hit_rating` DECIMAL(5,2) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_ranking_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_ranking_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `stock_price`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
