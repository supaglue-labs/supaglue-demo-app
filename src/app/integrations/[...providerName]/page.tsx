import { ConnectPanel } from "@/components/ConnectPanel";
import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import { DATA_MODEL } from "@/lib/env";
import { fetchConnectionForProvider } from "@/remote/supaglue/fetch_connection_for_provider";
import { fetchObjects } from "@/remote/supaglue/fetch_objects";
import { fetchProperties } from "@/remote/supaglue/fetch_properties";
import { fetchSyncRuns } from "@/remote/supaglue/fetch_sync_runs";
import { ReactNode } from "react";

import { AccordionItem } from "@/components/AccordionItem";
import StatCard from "@/components/StatCard";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { Property } from "@/types/supaglue";
import { cookies } from "next/headers";

function Header({ children }: { children: ReactNode }) {
  return <h1 className="text-xl semi-bold underline my-2">{children}</h1>;
}

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

  const objects = await fetchObjects(activeCustomer.id, providerName);
  const objectNames = objects.map((object) => object.object_name) || [];

  /**
   * Fetch all field mapping options per object
   */
  const properties = await fetchProperties(
    activeCustomer.id,
    DATA_MODEL,
    objectNames,
    providerName
  );
  const propertiesMap: Record<string, Property[]> = objectNames
    .map((objectName: string) => objectName)
    .reduce((acc: any, objectName: string, idx: number) => {
      return { ...acc, [objectName]: properties[idx].properties };
    }, {});

  /**
   * Fetch all sync runs per object
   */
  const syncRuns = await fetchSyncRuns(DATA_MODEL, objectNames);

  return (
    <>
      <Nav title={`Settings - Configure (${providerName})`} />
      <Content>
        <div className="form-control flex flex-col gap-4">
          {/* Connect */}
          <div className="max-w-md">
            <Header>Integration Connection</Header>
            <ConnectPanel
              customerId={activeCustomer.id}
              providerName={providerName}
              activeConnection={currentConnection}
            />
          </div>

          {/* Field mapping */}
          <div className="max-w-md">
            <Header>Field Mappings</Header>
            {objects.length === 0 && (
              <div className="italic">No objects for field mapping.</div>
            )}
            <div className="join join-vertical w-full">
              {objects.map((object, idx: number) => {
                return (
                  <AccordionItem
                    key={`AccordionItem_${idx}`}
                    object={object}
                    providerName={providerName}
                    properties={propertiesMap[object.object_name] || []}
                  />
                );
              })}
            </div>
          </div>

          {/* Last Synced */}
          <div>
            <Header>Sync Stats</Header>
            {objectNames.length === 0 && (
              <div className="italic">No objects are currently synced.</div>
            )}
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              {objectNames.map((objectName: string, idx: number) => {
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
