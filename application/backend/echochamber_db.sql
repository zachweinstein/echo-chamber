-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema echochamber-db2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema echochamber-db2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `echochamber-db2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `echochamber-db2` ;

-- -----------------------------------------------------
-- Table `echochamber-db2`.`Account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `echochamber-db2`.`Account` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `provider` VARCHAR(191) NOT NULL,
  `providerAccountId` VARCHAR(191) NOT NULL,
  `refresh_token` TEXT NULL DEFAULT NULL,
  `access_token` TEXT NULL DEFAULT NULL,
  `expires_at` INT NULL DEFAULT NULL,
  `token_type` VARCHAR(191) NULL DEFAULT NULL,
  `scope` VARCHAR(191) NULL DEFAULT NULL,
  `id_token` TEXT NULL DEFAULT NULL,
  `session_state` VARCHAR(191) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Account_provider_providerAccountId_key` (`provider` ASC, `providerAccountId` ASC) VISIBLE,
  INDEX `Account_userId_idx` (`userId` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `echochamber-db2`.`Session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `echochamber-db2`.`Session` (
  `id` VARCHAR(191) NOT NULL,
  `sessionToken` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `Session_sessionToken_key` (`sessionToken` ASC) VISIBLE,
  INDEX `Session_userId_idx` (`userId` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `echochamber-db2`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `echochamber-db2`.`User` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NULL DEFAULT NULL,
  `email` VARCHAR(191) NULL DEFAULT NULL,
  `emailVerified` DATETIME(3) NULL DEFAULT NULL,
  `image` VARCHAR(191) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `User_email_key` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `echochamber-db2`.`VerificationToken`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `echochamber-db2`.`VerificationToken` (
  `identifier` VARCHAR(191) NOT NULL,
  `token` VARCHAR(191) NOT NULL,
  `expires` DATETIME(3) NOT NULL,
  UNIQUE INDEX `VerificationToken_token_key` (`token` ASC) VISIBLE,
  UNIQUE INDEX `VerificationToken_identifier_token_key` (`identifier` ASC, `token` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `echochamber-db2`.`_prisma_migrations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `echochamber-db2`.`_prisma_migrations` (
  `id` VARCHAR(36) NOT NULL,
  `checksum` VARCHAR(64) NOT NULL,
  `finished_at` DATETIME(3) NULL DEFAULT NULL,
  `migration_name` VARCHAR(255) NOT NULL,
  `logs` TEXT NULL DEFAULT NULL,
  `rolled_back_at` DATETIME(3) NULL DEFAULT NULL,
  `started_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` INT UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `echochamber-db2`.`echo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `echochamber-db2`.`echo` (
  `echo_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `bio` VARCHAR(255) NULL DEFAULT NULL,
  `owned` TINYINT NULL DEFAULT '0',
  `user_id` INT NULL DEFAULT NULL,
  `platform` VARCHAR(128) NULL DEFAULT NULL,
  PRIMARY KEY (`echo_id`),
  UNIQUE INDEX `echo_id_UNIQUE` (`echo_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `echochamber-db2`.`hashtag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `echochamber-db2`.`hashtag` (
  `hash` VARCHAR(128) NULL DEFAULT NULL,
  `Post_post_id` INT NOT NULL,
  INDEX `fk_hashtag_Post1_idx` (`Post_post_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `echochamber-db2`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `echochamber-db2`.`post` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `karma` INT UNSIGNED NULL DEFAULT '0',
  `echo_echo_id` INT NOT NULL,
  `time_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`, `echo_echo_id`),
  INDEX `fk_post_echo1_idx` (`echo_echo_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 149
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `echochamber-db2`.`post_has_post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `echochamber-db2`.`post_has_post` (
  `original_post_id` INT NOT NULL,
  `post_post_id` INT NOT NULL,
  PRIMARY KEY (`original_post_id`, `post_post_id`),
  UNIQUE INDEX `post_post_id_UNIQUE` (`post_post_id` ASC) VISIBLE,
  INDEX `fk_Post_has_Post_Post1_idx` (`original_post_id` ASC) VISIBLE,
  INDEX `fk_Post_has_Post_Post2_idx` (`post_post_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
