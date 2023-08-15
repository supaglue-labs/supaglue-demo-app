import { APPLICATION_ID } from "@/lib/env";
import { CrmAccount } from "@/types/apolla";
import { Prisma } from "../../../prisma/generated/supaglue_client";
import { supagluePrismaClient } from "./prisma";

function mapToApollaCrmAccount(crmAccount: {
  id: string;
  name: string | null;
  industry: string | null;
  website: string | null;
  phone_numbers: Prisma.JsonValue;
  raw_data: Prisma.JsonValue;
}): CrmAccount {
  return {
    id: crmAccount.id as string,
    name: crmAccount.name as string,
    website: crmAccount.website as string,
    industry: crmAccount.industry as string,
    phoneNumbers: crmAccount.phone_numbers
      ? (crmAccount.phone_numbers as {
          phone_number: string;
          phone_number_type: string;
        }[])
      : [],
    rawData: crmAccount.raw_data,
  };
}

/**
 * Use Prisma to retrieve CRM Contacts synced to your Postgres by Supaglue.
 */
export async function fetchCrmAccountsByWebsite(
  customerId: string,
  providerName: string,
  websites: string[]
): Promise<CrmAccount[]> {
  const crmAccounts = await supagluePrismaClient.crm_accounts.findMany({
    select: {
      id: true,
      name: true,
      website: true,
      phone_numbers: true,
      industry: true,
      number_of_employees: true,
      raw_data: true,
    },
    where: {
      //
      // Supaglue partitions your customer data in destination tables by {application_id, customer_id, provider_name}.
      //
      supaglue_application_id: APPLICATION_ID,
      supaglue_customer_id: customerId,
      supaglue_provider_name: providerName,
      website: {
        in: websites,
      },
    },
  });

  return crmAccounts.map((crmAccount) => mapToApollaCrmAccount(crmAccount));
}
