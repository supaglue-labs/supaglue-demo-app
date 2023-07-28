import { API_HOST, APPLICATION_ID } from "./env";

/**
 * Create an embedded link to allow your customer to trigger OAuth authentication with their third-party provider.
 */
export function getEmbeddedLink(
  customerId: string,
  providerName: string,
  scope?: string
) {
  const returnUrl = "https://supaglue-demo-app.vercel.app/integrations";

  const params = new URLSearchParams({
    applicationId: APPLICATION_ID,
    customerId,
    returnUrl,
    providerName,
    ...(scope ? { scope } : {}),
  });

  return `${API_HOST}/oauth/connect?${params.toString()}`;
}
