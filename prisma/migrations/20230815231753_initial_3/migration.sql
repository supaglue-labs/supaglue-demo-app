/*
  Warnings:

  - You are about to drop the column `addresses` on the `apolla_contact` table. All the data in the column will be lost.
  - You are about to drop the column `email_addresses` on the `apolla_contact` table. All the data in the column will be lost.
  - Added the required column `email_address` to the `apolla_contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apolla_contact" DROP COLUMN "addresses",
DROP COLUMN "email_addresses",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "email_address" TEXT NOT NULL,
ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL,
ALTER COLUMN "phone_number" DROP NOT NULL;
