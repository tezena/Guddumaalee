-- CreateEnum
CREATE TYPE "CaseStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'FINISHED', 'WITHDRAWN');

-- CreateTable
CREATE TABLE "Case" (
    "id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "lawyer_id" INTEGER NOT NULL,
    "status" "CaseStatus" NOT NULL DEFAULT 'PENDING',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "payment_id" TEXT,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trial" (
    "id" SERIAL NOT NULL,
    "trial_date" TIMESTAMP(3) NOT NULL,
    "case_id" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Trial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Case_payment_id_key" ON "Case"("payment_id");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_lawyer_id_fkey" FOREIGN KEY ("lawyer_id") REFERENCES "lawyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trial" ADD CONSTRAINT "Trial_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
