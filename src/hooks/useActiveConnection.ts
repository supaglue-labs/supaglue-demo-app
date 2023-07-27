import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useActiveConnection(customerId: string) {
  const { data } = useSWR(`/api/get-active-connection`, fetcher);

  return data;
}
