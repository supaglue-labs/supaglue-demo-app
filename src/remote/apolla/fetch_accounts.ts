import { ApollaAccount } from "@/types/apolla";
import { apollaPrismaClient } from "../prisma";

function mapToApollaAccount(apollaAccount: {
  id: string;
  name: string | null;
  industry: string | null;
  domain: string;
  lifecycle_stage: string | null;
}): ApollaAccount {
  return {
    id: apollaAccount.id,
    name: apollaAccount.name,
    domain: apollaAccount.domain,
    industry: apollaAccount.industry,
    lifecycleStage: apollaAccount.lifecycle_stage,
  };
}

/**
 * Use Prisma to retrieve Apolla Accounts that we ETL from Supaglue's database to our Apolla application database.
 */
export async function fetchAccountsByDomain(
  domains: string[]
): Promise<ApollaAccount[]> {
  const apollaAccounts = await apollaPrismaClient.apolla_account.findMany({
    select: {
      id: true,
      name: true,
      domain: true,
      phone_number: true,
      industry: true,
      number_of_employees: true,
      lifecycle_stage: true,
    },
    where: {
      domain: {
        in: domains,
      },
    },
  });

  return apollaAccounts.map((apollaAccount) =>
    mapToApollaAccount(apollaAccount)
  );
}
