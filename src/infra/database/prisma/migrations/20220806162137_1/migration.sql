-- CreateTable
CREATE TABLE `Credential` (
    `key` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `eventCode` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Credential` ADD CONSTRAINT `Credential_eventCode_fkey` FOREIGN KEY (`eventCode`) REFERENCES `EventType`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
