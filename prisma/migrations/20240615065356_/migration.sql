-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('CLIENT', 'LAWYER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Specialty" AS ENUM ('CORPORATE_LAW', 'CRIMINAL_LAW', 'FAMILY_LAW', 'INTELLECTUAL_PROPERTY_LAW', 'EMPLOYMENT_LAW', 'IMMIGRATION_LAW', 'REAL_ESTATE_LAW', 'ENVIRONMENTAL_LAW', 'TAX_LAW', 'BANKRUPTCY_LAW');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('AMHARIC', 'OROMO', 'TIGRINYA', 'SOMALI', 'SIDAMO', 'WOLAYTTA', 'GURAGE', 'AFAR', 'HADIYYA', 'GAMO');

-- CreateEnum
CREATE TYPE "Court" AS ENUM ('SUPREME_COURT', 'APPELLATE_COURT', 'HIGH_COURT', 'DISTRICT_COURT', 'SMALL_CLAIMS_COURT', 'ADMINISTRATIVE_COURT');

-- CreateEnum
CREATE TYPE "DisputeStatus" AS ENUM ('PENDING', 'ACCEPTED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "LawyerStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ChatUser" AS ENUM ('CLIENT', 'LAWYER');

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lawyer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "identification_card" TEXT NOT NULL,
    "qualification" TEXT NOT NULL,
    "cv" TEXT,
    "resume" TEXT,
    "languages" "Language"[] DEFAULT ARRAY[]::"Language"[],
    "specialties" "Specialty"[] DEFAULT ARRAY[]::"Specialty"[],
    "courts" "Court"[] DEFAULT ARRAY[]::"Court"[],
    "isVerified" "LawyerStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "photo" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "lawyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "reply" TEXT,

    CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispute" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "lawyer_id" INTEGER NOT NULL,
    "creator_email" TEXT NOT NULL,
    "status" "DisputeStatus" NOT NULL DEFAULT 'PENDING',
    "content" TEXT NOT NULL,

    CONSTRAINT "dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "sender_email" TEXT NOT NULL,
    "reciver_email" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "lawyerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_phone_number_key" ON "client"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "lawyer_email_key" ON "lawyer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lawyer_phone_number_key" ON "lawyer"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE INDEX "Message_clientId_lawyerId_idx" ON "Message"("clientId", "lawyerId");

-- AddForeignKey
ALTER TABLE "dispute" ADD CONSTRAINT "dispute_lawyer_id_fkey" FOREIGN KEY ("lawyer_id") REFERENCES "lawyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute" ADD CONSTRAINT "dispute_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "lawyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
