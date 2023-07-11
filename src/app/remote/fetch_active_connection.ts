import { API_HOST, CUSTOMER_ID } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { getHeaders } from "../api/helper";
import { Connection } from "../types";

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
