import { Content } from "@/components/Content";
import { FieldMappers } from "@/components/FieldMappers";
import { Nav } from "@/components/Nav";
import { API_HOST, APPLICATION_ID, CUSTOMER_ID } from "@/lib/constants";
import { DateTime } from "luxon";

function FieldMappingLabel({ providerName }: { providerName: string }) {
  return (
    <>
      <label className="label">
        <span className="label-text underline">Apolla.io field</span>
      </label>
      <label className="label">
        <span className="label-text underline">Your {providerName} field</span>
      </label>
    </>
  );
}

function FieldPair({
  name,
  mappedName,
  options = [],
}: {
  name: string;
  mappedName?: string;
  options: string[];
}) {
  return (
    <>
      <input
        type="text"
        disabled={true}
        className="input input-bordered w-full max-w-xs"
        defaultValue={name}
      />
      <select className="select w-full max-w-xs">
        <option disabled defaultValue={mappedName}>
          Salesforce field
        </option>
        {mappedName ? (
          <option>{mappedName}</option>
        ) : (
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))
        )}
      </select>
    </>
  );
}

export default async function Settings({
  params: {
    providerName: [providerName],
  },
}: {
  params: { providerName: string[] };
}) {
  const connectionsResponse = await fetch(
    `${API_HOST}/mgmt/v2/customers/${CUSTOMER_ID}/connections`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
      },
    }
  );
  const connections = await connectionsResponse.json();
  const connection = connections.find(
    (connection: any) => connection.provider_name === providerName
  );

  const standardObjectsResponse = await fetch(
    `${API_HOST}/mgmt/v2/customers/${CUSTOMER_ID}/connections/${connection?.id}/objects`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
      },
      cache: "no-store",
    }
  );

  const objects = await standardObjectsResponse.json();
  const objectNames = objects.standard.map((object: any) => object.name);

  const propertiesResponses = await Promise.all(
    objectNames.map(
      async (objectName: string) =>
        await fetch(
          `${API_HOST}/mgmt/v2/customers/${CUSTOMER_ID}/connections/${connection?.id}/properties?type=standard&name=${objectName}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
            },
          }
        )
    )
  );

  const properties = await Promise.all(
    propertiesResponses.map(async (response: any) => await response.json())
  );

  const propertiesMap = objectNames
    .map((objectName: string) => objectName)
    .reduce((acc: any, objectName: string, idx: number) => {
      return { ...acc, [objectName]: properties[idx] };
    }, {});

  return (
    <>
      <Nav title={`Settings - Configure (${providerName})`} />
      <Content>
        <div className="form-control w-full max-w-sm flex flex-col gap-4">
          {/* Connect */}
          {connection ? (
            <button className="btn btn-disabled">Connected</button>
          ) : (
            <a
              href={`${API_HOST}/oauth/connect?applicationId=${APPLICATION_ID}e&customerId=${CUSTOMER_ID}&returnUrl=http://localhost:3002&providerName=${providerName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn btn-primary">
                Connect {providerName}
              </button>
            </a>
          )}

          {/* Field mapping */}
          <div className="join join-vertical w-full">
            {objects?.standard?.map((standardObject: any, idx: number) => {
              return (
                <div
                  key={`object_${idx}`}
                  className="collapse collapse-arrow join-item border border-base-300"
                >
                  <input type="radio" name="my-accordion-4" />
                  <div className="collapse-title text-xl font-medium">
                    {standardObject.name}
                  </div>
                  <div className="collapse-content">
                    <FieldMappers
                      key={`FieldMappers_${idx}`}
                      connectionId={connection?.id}
                      providerName={providerName}
                      fields={standardObject?.schema?.config?.fields}
                      propertiesMap={propertiesMap}
                      objectName={standardObject?.name}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Last Synced */}
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Last synced</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">
                records on{" "}
                {DateTime.now().toLocaleString(DateTime.DATETIME_FULL)}
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
}
