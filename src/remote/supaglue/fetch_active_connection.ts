import { API_HOST, CUSTOMER_ID } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { getHeaders } from "@/lib/headers";
import { Connection } from "@/types/supaglue";

/**
 * Use Supaglue's Management API to fetch the connections that one of your customers has created.
 * Each connection represents a connection to a third-party provider.
 * https://docs.supaglue.com/api/v2/mgmt/get-connections
 */
export async function fetchActiveConnection(providerName: string) {
  const connections = await fetcher<Connection[]>(
    `${API_HOST}/mgmt/v2/customers/${CUSTOMER_ID}/connections`,
    {
      headers: getHeaders(),
    }
  );
  const activeConnection = connections.find(
    (connection) => connection.provider_name === providerName
  );

  return activeConnection;
}
