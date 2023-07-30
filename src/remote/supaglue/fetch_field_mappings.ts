import { API_HOST } from "@/lib/env";
import { fetcher } from "@/lib/fetcher";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { ObjectFieldMapping } from "@/types/supaglue";

/**
 * Use Supaglue's Management API to fetch the objects that have field mappings associated with it.
 * You can use this information to render field mapping UI to your customers.
 * https://docs.supaglue.com/api/v2/mgmt/field_mappings
 */
export async function fetchFieldMappings(
  customerId: string,
  providerName: string
) {
  const fieldMappings = await fetcher<
    ObjectFieldMapping[] | { errors: string[] }
  >(`${API_HOST}/mgmt/v2/field_mappings`, {
    headers: getHeadersWithCustomerProvider(customerId, providerName),
    cache: "no-store",
  });

  if ("errors" in fieldMappings) {
    return [];
  }

  return fieldMappings;
}
