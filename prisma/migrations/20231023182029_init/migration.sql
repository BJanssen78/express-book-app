/*
  Warnings:

  - Added the required column `order_type` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `Orders` DROP FOREIGN KEY `Orders_user_id_fkey`;

-- AlterTable
ALTER TABLE `Orders` ADD COLUMN `order_type` ENUM('BOOK', 'RECORD') NOT NULL,
    ADD COLUMN `record_id` VARCHAR(191) NULL,
    MODIFY `book_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Record` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `artist` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `available` BOOLEAN NOT NULL,
    `genre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Orders_record_id_idx` ON `Orders`(`record_id`);
