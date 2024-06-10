/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Specialty" AS ENUM ('CORPORATE_LAW', 'CRIMINAL_LAW', 'FAMILY_LAW', 'INTELLECTUAL_PROPERTY_LAW', 'EMPLOYMENT_LAW', 'IMMIGRATION_LAW', 'REAL_ESTATE_LAW', 'ENVIRONMENTAL_LAW', 'TAX_LAW', 'BANKRUPTCY_LAW');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('AMHARIC', 'OROMO', 'TIGRINYA', 'SOMALI', 'SIDAMO', 'WOLAYTTA', 'GURAGE', 'AFAR', 'HADIYYA', 'GAMO');

-- CreateEnum
CREATE TYPE "Court" AS ENUM ('SUPREME_COURT', 'APPELLATE_COURT', 'HIGH_COURT', 'DISTRICT_COURT', 'SMALL_CLAIMS_COURT', 'ADMINISTRATIVE_COURT');

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lawyer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "identification_card" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "cv" TEXT,
    "resume" TEXT,
    "languages" "Language"[] DEFAULT ARRAY[]::"Language"[],
    "specialties" "Specialty"[] DEFAULT ARRAY[]::"Specialty"[],
    "courts" "Court"[] DEFAULT ARRAY[]::"Court"[],
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lawyer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lawyer_email_key" ON "lawyer"("email");
