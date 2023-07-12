export const CUSTOMER_ID = "john-doe";
export const API_HOST = "https://api.staging.supaglue.io";
export const APPLICATION_ID = "ff7c36cd-155b-41ed-8852-d2a86035f70e";
// export const API_HOST = "http://localhost:8080";
// export const APPLICATION_ID = "1b511fe8-d5d5-49ba-8d1f-545e8f3cefa1";

export function getStagingEnvObjectType(providerName: string) {
  const providerNameToObjectType: Record<string, string> = {
    salesforce: "standard",
    pipedrive: "common",
    hubspot: "standard",
  };

  return providerNameToObjectType[providerName] || "standard";
}

export function getEmbeddLink(providerName: string) {
  const returnUrl = "http://localhost:3002";

  return `${API_HOST}/oauth/connect?applicationId=${APPLICATION_ID}&customerId=${CUSTOMER_ID}&returnUrl=${returnUrl}&providerName=${providerName}`;
}
