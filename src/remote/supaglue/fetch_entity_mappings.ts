import { API_HOST } from "@/lib/env";
import { fetcher } from "@/lib/fetcher";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { EntityMapping } from "@/types/supaglue";

/**
 * Use Supaglue's Management API to fetch the objects that have entity mappings associated with it.
 * You can use this information to render entity mapping UI to your customers.
 * https://docs.supaglue.com/api/v2/mgmt/entity_mappings
 */
export async function fetchEntityMappings(
  customerId: string,
  providerName: string
) {
  const entityMappings = await fetcher<EntityMapping[] | { errors: string[] }>(
    `${API_HOST}/mgmt/v2/entity_mappings`,
    {
      headers: getHeadersWithCustomerProvider(customerId, providerName),
      cache: "no-store",
    }
  );

  if ("errors" in entityMappings) {
    return [];
  }

  return entityMappings;
}
