import { PrismaClient as ApollaPrismaClient } from "../../prisma/generated/apolla_client";
import { PrismaClient as SupagluePrismaClient } from "../../prisma/generated/supaglue_client";

export const supagluePrismaClient = new SupagluePrismaClient();
export const apollaPrismaClient = new ApollaPrismaClient();
