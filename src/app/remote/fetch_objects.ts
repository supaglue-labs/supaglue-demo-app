import { API_HOST } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { getHeadersWithCustomerProvider } from "../api/helper";
import { ObjectFieldMapping } from "../types";

export async function fetchObjects(providerName: string) {
  const objects = await fetcher<ObjectFieldMapping[]>(
    `${API_HOST}/mgmt/v2/field_mappings`,
    {
      headers: getHeadersWithCustomerProvider(providerName),
      cache: "no-store",
    }
  );

  return objects;
}
