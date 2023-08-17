export function remoteContactToApollaContact(
  providerName: string,
  remoteData: any
) {
  switch (providerName) {
    case "salesforce":
      return {
        name: remoteData.name,
        email_address: remoteData.email,
        updated_at: new Date(),
      };
    case "hubspot":
      return {
        name: remoteData.name,
        email_address: remoteData.email,
        updated_at: new Date(),
      };
    default:
      throw new Error("provider not supported");
  }
}
