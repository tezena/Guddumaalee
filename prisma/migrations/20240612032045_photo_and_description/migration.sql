/*
  Warnings:

  - Added the required column `description` to the `lawyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `lawyer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lawyer" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL;
