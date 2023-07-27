import { API_HOST } from "@/lib/env";
import { fetcher } from "@/lib/fetcher";
import { getHeadersWithCustomerProvider } from "@/lib/headers";

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
        await fetcher<{ properties: string[] }>(
          `${API_HOST}/mgmt/v2/properties?type=${objectType}&name=${objectName}`,
          {
            headers: getHeadersWithCustomerProvider(customerId, providerName),
          }
        )
    )
  );

  return properties;
}
