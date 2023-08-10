import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import { ConnectPanel } from "@/components/integrations/ConnectPanel";
import EntityMapperComponent from "@/components/integrations/EntityMapper";
import FieldMapperComponent from "@/components/integrations/FieldMapper";
import IntegrationsHeader from "@/components/integrations/IntegrationsHeader";
import StatCard from "@/components/integrations/StatCard";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { DATA_MODEL } from "@/lib/env";
import { fetchConnectionForProvider } from "@/remote/supaglue/fetch_connection_for_provider";
import { fetchEntityMappings } from "@/remote/supaglue/fetch_entity_mappings";
import { fetchFieldMappings } from "@/remote/supaglue/fetch_field_mappings";
import { fetchProperties } from "@/remote/supaglue/fetch_properties";
import { fetchSyncRuns } from "@/remote/supaglue/fetch_sync_runs";
import { Property } from "@/types/supaglue";
import { cookies } from "next/headers";

const PROVIDERS_TO_SHOW_ENTITY_MAPPING = [
  "salesforce",
  "hubspot",
  "pipedrive",
  "ms_dynamics_365_sales",
];

export default async function IntegrationDetails({
  params: {
    providerName: [providerName],
  },
}: {
  params: { providerName: string[] };
}) {
  // Note: force Dynamic Rendering
  const cookieStore = cookies();

  const activeCustomer = useCustomerContext();
  const currentConnection = await fetchConnectionForProvider(
    activeCustomer.id,
    providerName
  );

  const objectFieldMappings = await fetchFieldMappings(
    activeCustomer.id,
    providerName
  );
  const entityMappings = await fetchEntityMappings(
    activeCustomer.id,
    providerName
  );

  const objectOrEntityNames =
    entityMappings.map(
      (entityFieldMapping) => entityFieldMapping.entity_name
    ) ||
    objectFieldMappings.map(
      (objectFieldMapping) => objectFieldMapping.object_name
    ) ||
    [];

  /**
   * Fetch all field mapping options per object
   */
  const properties = await fetchProperties(
    activeCustomer.id,
    DATA_MODEL,
    objectOrEntityNames,
    providerName
  );
  const propertiesMap: Record<string, Property[]> = objectOrEntityNames
    .map((objectName: string) => objectName)
    .reduce((acc: any, objectName: string, idx: number) => {
      return { ...acc, [objectName]: properties[idx].properties };
    }, {});

  /**
   * Fetch all sync runs per object
   */
  const syncRuns = await fetchSyncRuns(DATA_MODEL, objectOrEntityNames);

  return (
    <>
      <Nav title={`Settings - Configure (${providerName})`} />
      <Content>
        <div className="form-control flex flex-col gap-4">
          {/* Connect */}
          <div className="max-w-md">
            <IntegrationsHeader>Integration Connection</IntegrationsHeader>
            <ConnectPanel
              customerId={activeCustomer.id}
              providerName={providerName}
              activeConnection={currentConnection}
            />
          </div>

          {PROVIDERS_TO_SHOW_ENTITY_MAPPING.includes(providerName) ? (
            <div className="max-w-2xl">
              <EntityMapperComponent
                providerName={providerName}
                entityMappings={entityMappings}
              />
            </div>
          ) : (
            <div className="max-w-2xl">
              <FieldMapperComponent
                providerName={providerName}
                propertiesMap={propertiesMap}
                objectFieldMappings={objectFieldMappings}
              />
            </div>
          )}

          {/* Last Synced */}
          <div>
            <IntegrationsHeader>Sync Stats</IntegrationsHeader>
            {objectOrEntityNames.length === 0 && (
              <div className="italic">No objects are currently synced.</div>
            )}
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              {objectOrEntityNames.map((objectName: string, idx: number) => {
                const syncRun = syncRuns.find(
                  (syncRun) => syncRun.results[0]?.object === objectName
                );

                return (
                  <StatCard
                    key={`StatCard_${idx}`}
                    syncRun={syncRun}
                    objectName={objectName}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}
