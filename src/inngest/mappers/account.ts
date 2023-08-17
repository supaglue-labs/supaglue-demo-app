export function remoteAccountToApollaAccount(
  providerName: string,
  remoteData: any
) {
  switch (providerName) {
    case "salesforce":
      return {
        name: remoteData.name,
        domain: remoteData.domain ?? "null",
        lifecycle_stage: remoteData.stage,
        updated_at: new Date(),
      };
    case "hubspot":
      return {
        name: remoteData.name,
        domain: remoteData.domain ?? "null",
        lifecycle_stage: remoteData.stage,
        updated_at: new Date(),
      };
    default:
      throw new Error("provider not supported");
  }
}
