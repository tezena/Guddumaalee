/*
  Warnings:

  - You are about to drop the column `client_id` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `lawyer_id` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[payment_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `case_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'TRANSFERRED');

-- CreateEnum
CREATE TYPE "WithdrawRequestStatus" AS ENUM ('PENDING', 'TRANSFERRED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "CaseStatus" ADD VALUE 'DELIVERED';
ALTER TYPE "CaseStatus" ADD VALUE 'PAID';

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_client_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_lawyer_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "client_id",
DROP COLUMN "lawyer_id",
ADD COLUMN     "case_id" INTEGER NOT NULL,
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "WithdrawRequest" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "WithdrawRequestStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "dispute" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_payment_id_key" ON "Transaction"("payment_id");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
