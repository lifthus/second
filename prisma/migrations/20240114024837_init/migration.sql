-- CreateTable
CREATE TABLE `Customer` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `gradeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerGrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `CustomerGrade_grade_key`(`grade`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerOrder` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `customerId` BIGINT NOT NULL,
    `orderDate` DATETIME(3) NOT NULL,
    `orderTypeId` INTEGER NOT NULL,
    `orderAmount` DECIMAL(65, 30) NOT NULL,

    INDEX `CustomerOrder_orderDate_idx`(`orderDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerOrderType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderType` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `CustomerOrderType_orderType_key`(`orderType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `CustomerGrade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerOrder` ADD CONSTRAINT `CustomerOrder_orderTypeId_fkey` FOREIGN KEY (`orderTypeId`) REFERENCES `CustomerOrderType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
