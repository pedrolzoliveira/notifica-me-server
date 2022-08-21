/*
  Warnings:

  - You are about to drop the column `document` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `RegisteredEventsTypes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `RegisteredEventsTypes` DROP FOREIGN KEY `RegisteredEventsTypes_eventCode_fkey`;

-- DropForeignKey
ALTER TABLE `RegisteredEventsTypes` DROP FOREIGN KEY `RegisteredEventsTypes_receiverId_fkey`;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `document`,
    DROP COLUMN `type`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `passwordHash` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Receiver` ALTER COLUMN `name` DROP DEFAULT;

-- DropTable
DROP TABLE `RegisteredEventsTypes`;

-- CreateTable
CREATE TABLE `Creator` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Creator_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EventTypeToReceiver` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EventTypeToReceiver_AB_unique`(`A`, `B`),
    INDEX `_EventTypeToReceiver_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Customer_email_key` ON `Customer`(`email`);

-- AddForeignKey
ALTER TABLE `_EventTypeToReceiver` ADD CONSTRAINT `_EventTypeToReceiver_A_fkey` FOREIGN KEY (`A`) REFERENCES `EventType`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EventTypeToReceiver` ADD CONSTRAINT `_EventTypeToReceiver_B_fkey` FOREIGN KEY (`B`) REFERENCES `Receiver`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
