/*
  Warnings:

  - A unique constraint covering the columns `[google_user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `google_user_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `google_user_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_google_user_id_key` ON `User`(`google_user_id`);
