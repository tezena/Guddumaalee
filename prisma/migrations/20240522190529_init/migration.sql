-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('CLIENT', 'LAWYER', 'ADMIN');

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
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lawyer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lawyer_email_key" ON "lawyer"("email");
