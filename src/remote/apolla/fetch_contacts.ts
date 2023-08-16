import { ApollaContact } from "@/types/apolla";
import { apollaPrismaClient } from "../prisma";

function mapToApollaContact(apollaContact: {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email_address: string;
  phone_number: string | null;
  address: string | null;
  lifecycle_stage: string | null;
}): ApollaContact {
  return {
    id: apollaContact.id,
    firstName: apollaContact.first_name,
    lastName: apollaContact.last_name,
    emailAddress: apollaContact.email_address,
    phoneNumber: apollaContact.phone_number,
    address: apollaContact.address,
    lifecycleStage: apollaContact.lifecycle_stage,
  };
}

/**
 * Use Prisma to retrieve Apolla Contacts that we ETL from Supaglue's database to our Apolla application database.
 */
export async function fetchContactsByEmails(
  emails: string[]
): Promise<ApollaContact[]> {
  const apollaContacts = await apollaPrismaClient.apolla_contact.findMany({
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email_address: true,
      phone_number: true,
      address: true,
      lifecycle_stage: true,
    },
    where: {
      email_address: {
        in: emails,
      },
    },
  });

  return apollaContacts.map((apollaContact) =>
    mapToApollaContact(apollaContact)
  );
}
