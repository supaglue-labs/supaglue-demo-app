import { API_HOST } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { getHeadersWithCustomerProvider } from "../api/helper";

export async function fetchProperties(
  objectNames: string[],
  providerName: string
) {
  const properties = await Promise.all(
    objectNames.map(
      async (objectName: string) =>
        await fetcher<{ properties: string[] }>(
          `${API_HOST}/mgmt/v2/properties?type=standard&name=${objectName}`,
          {
            headers: getHeadersWithCustomerProvider(providerName),
          }
        )
    )
  );

  return properties;
}
