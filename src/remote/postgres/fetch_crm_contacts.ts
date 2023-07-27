import { APPLICATION_ID } from "@/lib/env";
import { CrmContact } from "@/types/apolla";
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

function mapToApollaCrmContact(crmContact: {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email_addresses: Prisma.JsonValue;
  phone_numbers: Prisma.JsonValue;
  addresses: Prisma.JsonValue;
  last_activity_at: Date | null;
  lifecycle_stage: string | null;
  raw_data: Prisma.JsonValue;
}): CrmContact {
  return {
    id: crmContact.id as string,
    firstName: crmContact.first_name as string,
    lastName: crmContact.last_name as string,
    emailAddress: crmContact.email_addresses
      ? (
          crmContact.email_addresses as {
            email_address: string;
            email_address_type: string;
          }[]
        )[0]?.email_address
      : "",
    phoneNumbers: crmContact.phone_numbers
      ? (crmContact.phone_numbers as {
          phone_number: string;
          phone_number_type: string;
        }[])
      : [],
    addresses: crmContact.addresses
      ? (crmContact.addresses as {
          address_type: string;
          city: string;
        }[])
      : [],
    lastActivityAt: crmContact.last_activity_at,
    lifecycleStage: crmContact.lifecycle_stage,
    rawData: crmContact.raw_data,
  };
}

/**
 * Use Prisma to retrieve CRM Contacts synced to your Postgres by Supaglue.
 */
export async function fetchCrmContactsByEmails(
  customerId: string,
  providerName: string,
  emails: string[]
): Promise<CrmContact[]> {
  const crmContacts = await prisma.crm_contacts.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email_addresses: true,
      phone_numbers: true,
      addresses: true,
      last_activity_at: true,
      lifecycle_stage: true,
      raw_data: true,
    },
    where: {
      //
      // Supaglue partitions your customer data in destination tables by {application_id, customer_id, provider_name}.
      //
      supaglue_application_id: APPLICATION_ID,
      supaglue_customer_id: customerId,
      supaglue_provider_name: providerName,

      //
      // This is a Postgres Generated Column that retrieves the "email_address_type="primary_email" from Supaglue's
      // `crm_contacts.email_addresses` JSONB array.
      // Example: `alter table crm_contacts add column email_address text generated always as (jsonb_path_query_first(crm_contacts.email_addresses,'$[*] ? (@.email_address_type == "primary").email_address')) stored;`
      //
      email_address: {
        in: emails.map((email) => JSON.stringify(email)), // note: generated column `email_address` has double quotes around the string at the moment
      },
    },
  });

  return crmContacts.map((crmContact) => mapToApollaCrmContact(crmContact));
}
