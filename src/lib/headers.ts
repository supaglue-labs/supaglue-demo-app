export function getHeaders() {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
  };
}

export function getHeadersWithCustomerProvider(
  customerId: string,
  providerName: string
) {
  return {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
    "x-customer-id": customerId,
    "x-provider-name": providerName,
  };
}
