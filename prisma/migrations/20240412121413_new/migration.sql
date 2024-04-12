/*
  Warnings:

  - You are about to drop the column `experience_years` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `working_area` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "experience_years",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phone",
DROP COLUMN "specialization",
DROP COLUMN "working_area";
