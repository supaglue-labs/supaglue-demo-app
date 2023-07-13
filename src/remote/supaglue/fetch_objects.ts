import { API_HOST } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { ObjectFieldMappings } from "@/types/supaglue";

/**
 * Use Supaglue's Management API to fetch the objects that have field mappings associated with it.
 * You can use this information to render field mapping UI to your customers.
 * https://docs.supaglue.com/api/v2/mgmt/field_mappings
 */
export async function fetchObjects(providerName: string) {
  const objects = await fetcher<ObjectFieldMappings[] | { errors: string[] }>(
    `${API_HOST}/mgmt/v2/field_mappings`,
    {
      headers: getHeadersWithCustomerProvider(providerName),
      cache: "no-store",
    }
  );

  if ("errors" in objects) {
    return [];
  }

  return objects;
}
