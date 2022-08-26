/*
  Warnings:

  - You are about to drop the `Creator` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adminId` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credential" ADD COLUMN     "adminId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Creator";

-- AddForeignKey
ALTER TABLE "Credential" ADD CONSTRAINT "Credential_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
