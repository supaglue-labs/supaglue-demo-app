import { fetchActiveConnection } from "@/app/remote/fetch_active_connection";
import { fetchObjects } from "@/app/remote/fetch_objects";
import { fetchProperties } from "@/app/remote/fetch_properties";
import { fetchSyncRuns } from "@/app/remote/fetch_sync_runs";
import { Content } from "@/components/Content";
import { FieldMappers } from "@/components/FieldMappers";
import { Nav } from "@/components/Nav";
import { getEmbeddLink, getStagingEnvObjectType } from "@/lib/constants";
import { DateTime } from "luxon";
import { ReactNode } from "react";

function Header({ children }: { children: ReactNode }) {
  return <h1 className="text-xl semi-bold underline my-2">{children}</h1>;
}

export default async function ProviderSettings({
  params: {
    providerName: [providerName],
  },
}: {
  params: { providerName: string[] };
}) {
  const activeConnection = await fetchActiveConnection(providerName);

  const objects = await fetchObjects(providerName);
  const objectNames = objects.map((object) => object.object_name) || [];

  const properties = await fetchProperties(
    getStagingEnvObjectType(providerName),
    objectNames,
    providerName
  );
  const propertiesMap = objectNames
    .map((objectName: string) => objectName)
    .reduce((acc: any, objectName: string, idx: number) => {
      return { ...acc, [objectName]: properties[idx] };
    }, {});

  const syncRuns = await fetchSyncRuns(objectNames);

  const embeddedLink = getEmbeddLink(providerName);

  return (
    <>
      <Nav title={`Settings - Configure (${providerName})`} />
      <Content>
        <div className="form-control flex flex-col gap-4">
          {/* Connect */}
          <div className="max-w-md">
            <Header>Integration Connection</Header>
            <a href={embeddedLink} target="_blank" rel="noopener noreferrer">
              {activeConnection ? (
                <button className="btn btn-neutral">Reconnect</button>
              ) : (
                <button className="btn btn-primary">Connect</button>
              )}
            </a>
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
                  <div
                    key={`object_${idx}`}
                    className="collapse collapse-arrow join-item border border-base-300"
                  >
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-xl font-medium">
                      {object.object_name}
                    </div>
                    <div className="collapse-content">
                      <FieldMappers
                        key={`FieldMappers_${idx}`}
                        providerName={providerName}
                        fields={object.fields}
                        properties={
                          propertiesMap[object.object_name].properties || []
                        }
                        objectName={object.object_name}
                      />
                    </div>
                  </div>
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
                const emptySyncRun = {
                  results: [
                    {
                      status: "ERROR",
                      num_records_synced: 0,
                      end_timestamp: new Date().toISOString(),
                    },
                  ],
                };
                const syncRun =
                  syncRuns.find(
                    (syncRun) => syncRun.results[0]?.object === objectName
                  ) || emptySyncRun;

                return (
                  <div className="stat" key={`Stat_${idx}`}>
                    <div className="stat-title">Synced ({objectName})</div>
                    <div className="stat-value">
                      {syncRun.results[0].num_records_synced ||
                        syncRun.results[0].status}
                    </div>
                    <div className="stat-desc">
                      records on{" "}
                      {DateTime.fromISO(
                        syncRun.results[0].end_timestamp
                      ).toLocaleString(DateTime.DATETIME_FULL)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}
