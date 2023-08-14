import { API_HOST } from "@/lib/env";
import { fetcher } from "@/lib/fetcher";
import { getHeaders } from "@/lib/headers";
import { Connection } from "@/types/supaglue";

/**
 * Use Supaglue's Management API to fetch the connections that one of your customers has created.
 * Each connection represents a connection to a third-party provider.
 * https://docs.supaglue.com/api/v2/mgmt/get-connections
 */
export async function fetchConnectionForProvider(
  customerId: string,
  providerName: string
) {
  const connections = await fetcher<Connection[]>(
    `${API_HOST}/mgmt/v2/customers/${customerId}/connections`,
    {
      headers: getHeaders(),
    }
  );

  if ("errors" in connections) {
    throw new Error("Could not query backend");
  }

  const activeConnection = connections.find(
    (connection) => connection.provider_name === providerName
  );

  return activeConnection;
}
