export function getProviderObjects(providerName: string) {
  switch (providerName) {
    case "hubspot":
      return ["contact", "company"];
    case "salesforce":
      return ["Contact", "Account"];
    default:
      return [];
  }
}
