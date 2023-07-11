import { CUSTOMER_ID } from "@/lib/constants";

export function getHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
  };
}

export function getHeadersWithCustomerProvider(providerName: string) {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
    "x-customer-id": CUSTOMER_ID,
    "x-provider-name": providerName,
  };
}
