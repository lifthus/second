# second

## Table Of Contents

[1. Architecture](#1-architecture)

[2. Domain](#2-domain)

[3. Database](#3-database)
- [3.1. Entity Relationship Diagram](#31-entity-relationship-diagram)
- [3.2. Data Definition Language](#32-data-definition-language)



## 1. Architecture

<p align="center">
<img src="https://github.com/lifthus/second/assets/108582413/7df826b7-4dc2-4f76-92cc-e308c015f695" alt="the second ERD" width="750" />
</p>

## 2. Domain

<p align="center">
<img src="https://github.com/lifthus/second/assets/108582413/ce6ff153-3a37-4ef4-bf02-c0eaa8118444" alt="the second ERD" width="750" />
</p>

## 3. Database

### 3.1. Entity Relationship Diagram

<p align="center">
<img src="https://github.com/lifthus/second/assets/108582413/a3e920ff-b7cf-4cfc-b0a7-92208eab8790" alt="the second ERD" width="750" />
</p>

### 3.2. Data Definition Language

```sql
CREATE TABLE `Customer` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `gradeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
    FOREIGN KEY (`gradeId`) REFERENCES `CustomerGrade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `CustomerGrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `CustomerGrade_grade_key`(`grade`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `CustomerOrder` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `customerId` BIGINT NOT NULL,
    `orderDate` DATETIME(3) NOT NULL,
    `orderTypeId` INTEGER NOT NULL,
    `orderAmount` DECIMAL(65, 30) NOT NULL,

    INDEX `CustomerOrder_orderDate_idx`(`orderDate`),
    PRIMARY KEY (`id`)
    FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
    FOREIGN KEY (`orderTypeId`) REFERENCES `CustomerOrderType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `CustomerOrderType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderType` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `CustomerOrderType_orderType_key`(`orderType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
