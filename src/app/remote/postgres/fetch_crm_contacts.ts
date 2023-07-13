import { CrmContact } from "@/app/types/apolla";
import { APPLICATION_ID, CUSTOMER_ID } from "@/lib/constants";
import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

function mapToApollaCrmContact(crmContact: {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email_addresses: Prisma.JsonValue;
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
  };
}

export async function fetchCrmContactsByEmails(
  providerName: string,
  emails: string[]
): Promise<CrmContact[]> {
  const crmContacts = await prisma.crm_contacts.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email_addresses: true,
    },
    where: {
      supaglue_application_id: APPLICATION_ID,
      supaglue_customer_id: CUSTOMER_ID,
      supaglue_provider_name: providerName,
      email_address: {
        in: emails.map((email) => JSON.stringify(email)), // note: generated column `email_address` has double quotes around the string at the moment
      },
    },
  });

  return crmContacts.map((crmContact) => mapToApollaCrmContact(crmContact));
}

export async function fetchCrmContacts(
  providerName: string
): Promise<CrmContact[]> {
  const crmContacts = await prisma.crm_contacts.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email_addresses: true,
    },
    where: {
      supaglue_application_id: APPLICATION_ID,
      supaglue_customer_id: CUSTOMER_ID,
      supaglue_provider_name: providerName,
    },
    take: 1000,
  });

  return crmContacts.map((crmContact) => mapToApollaCrmContact(crmContact));
}
