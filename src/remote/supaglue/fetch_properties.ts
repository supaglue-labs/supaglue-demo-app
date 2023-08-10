import { API_HOST } from "@/lib/env";
import { fetcher } from "@/lib/fetcher";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { Property } from "@/types/supaglue";

/**
 * Use Supaglue's Management API to fetch the options available for their field mappings.
 * https://docs.supaglue.com/api/v2/mgmt/properties
 */
export async function fetchProperties(
  customerId: string,
  objectType: string,
  objectNames: string[],
  providerName: string
) {
  const properties = await Promise.all(
    objectNames.map(
      async (objectName: string) =>
        await fetcher<{ properties: Property[] }>(
          `${API_HOST}/metadata/v2/properties?type=${objectType}&name=${objectName}`,
          {
            headers: getHeadersWithCustomerProvider(customerId, providerName),
          }
        )
    )
  );

  return properties;
}
