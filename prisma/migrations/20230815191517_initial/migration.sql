-- CreateTable
CREATE TABLE "apolla_account" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "industry" TEXT,
    "domain" TEXT NOT NULL,
    "number_of_employees" INTEGER,
    "addresses" TEXT,
    "phone_number" TEXT,
    "lifecycle_stage" TEXT,
    "owner_id" TEXT,

    CONSTRAINT "apolla_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apolla_contact" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "addresses" TEXT NOT NULL,
    "email_addresses" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "lifecycle_stage" TEXT,
    "account_id" TEXT,
    "owner_id" TEXT,

    CONSTRAINT "apolla_contact_pkey" PRIMARY KEY ("id")
);
