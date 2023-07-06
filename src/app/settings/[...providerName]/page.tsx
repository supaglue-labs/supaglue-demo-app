import { Content } from "@/components/Content";
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

function FieldPair({ name, mappedName }: { name: string; mappedName: string }) {
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
        <option>{mappedName}</option>
        <option>Marge</option>
        <option>Bart</option>
        <option>Lisa</option>
        <option>Maggie</option>
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
    }
  );

  const objects = await standardObjectsResponse.json();

  console.log("xxx", objects);

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
                    <div className="grid grid-cols-2 gap-4">
                      <FieldMappingLabel providerName={providerName} />
                      {standardObject?.schema?.config?.fields?.map(
                        (fieldMapping: any, idx: number) => (
                          <FieldPair
                            key={`fieldmapping_${idx}`}
                            name={fieldMapping.name}
                            mappedName={fieldMapping.mapped_name}
                          />
                        )
                      )}
                      <div></div>
                      <button className="btn btn-primary">Save</button>
                    </div>
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
