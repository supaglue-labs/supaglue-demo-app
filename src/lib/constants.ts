/**
 * Create an embedded link to allow your customer to trigger OAuth authentication with their third-party provider.
 */
export function getEmbeddLink(providerName: string, scope?: string) {
  const returnUrl = "http://localhost:3002";

  const params = new URLSearchParams({
    applicationId: APPLICATION_ID,
    customerId: CUSTOMER_ID,
    returnUrl,
    providerName,
    ...(scope ? { scope } : {}),
  });

  return `${API_HOST}/oauth/connect?${params.toString()}`;
}

//
// BEGIN: Hardcoded constants for Supaglue's demo purposes
//
export const CUSTOMER_ID = "john-doe";
export const API_HOST = "https://api.supaglue.io";
export const APPLICATION_ID = "4d9971de-773c-482c-b0a9-7545667dab46";
export const STAGING_MS_DYNAMICS_365_SALES_SCOPE =
  "https://org8d6f84ed.crm.dynamics.com/.default";
// export const API_HOST = "http://localhost:8080";
// export const APPLICATION_ID = "1b511fe8-d5d5-49ba-8d1f-545e8f3cefa1";
export function getStagingActionApiProviderName() {
  return "salesforce";
}
export function getStagingEnvObjectType(providerName: string) {
  const providerNameToObjectType: Record<string, string> = {
    salesforce: "common",
    pipedrive: "common",
    hubspot: "standard",
  };

  return providerNameToObjectType[providerName] || "standard";
}
//
// END
//
