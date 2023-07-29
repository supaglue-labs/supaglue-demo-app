import { ConnectPanel } from "@/components/ConnectPanel";
import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import { DATA_MODEL } from "@/lib/env";
import { fetchConnectionForProvider } from "@/remote/supaglue/fetch_connection_for_provider";
import { fetchObjectFieldMappings } from "@/remote/supaglue/fetch_object_field_mappings";
import { fetchProperties } from "@/remote/supaglue/fetch_properties";
import { fetchSyncRuns } from "@/remote/supaglue/fetch_sync_runs";

import FieldOrEntityMapper from "@/components/FieldOrEntityMapper";
import IntegrationsHeader from "@/components/IntegrationsHeader";
import StatCard from "@/components/StatCard";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { fetchEntityFieldMappings } from "@/remote/supaglue/fetch_entity_field_mappings";
import { Property } from "@/types/supaglue";
import { cookies } from "next/headers";

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

  const objectFieldMappings = await fetchObjectFieldMappings(
    activeCustomer.id,
    providerName
  );
  const entityFieldMappings = await fetchEntityFieldMappings(
    activeCustomer.id,
    providerName
  );

  const objectOrEntityNames =
    entityFieldMappings.map(
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

          {/* Field mapping */}
          <div className="max-w-md">
            <FieldOrEntityMapper
              providerName={providerName}
              propertiesMap={propertiesMap}
              objectFieldMappings={objectFieldMappings}
              entityMappings={entityFieldMappings}
            />
          </div>

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
