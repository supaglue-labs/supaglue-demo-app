import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import { DateTime } from "luxon";

function FieldMappingLabel() {
  return (
    <>
      <label className="label">
        <span className="label-text">Developer Field</span>
      </label>
      <label className="label">
        <span className="label-text">Customer Field</span>
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
  params: { providerName },
}: {
  params: { providerName: string };
}) {
  const response = await fetch(
    "https://api.supaglue.io/mgmt/v2/customers/george-xing-demo/connections",
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
      },
    }
  );
  const connections = await response.json();
  const connection = connections.find(
    (connection: any) => connection.provider_name === providerName
  );

  return (
    <>
      <Nav title={`Settings - Configure (${providerName})`} />
      <Content>
        <div className="form-control w-full max-w-sm flex flex-col gap-4">
          {/* Connect */}
          {connection ? (
            <button className="btn disabled">Connected</button>
          ) : (
            <button className="btn btn-primary">Connect {providerName}</button>
          )}

          {/* Field mapping */}
          <div className="join join-vertical w-full">
            {/* Contact */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Contact Object
              </div>
              <div className="collapse-content">
                <div className="grid grid-cols-2 gap-4">
                  <FieldMappingLabel />
                  <FieldPair name="first_name" mappedName="FirstName" />
                  <FieldPair name="last_name" mappedName="LastName" />
                  <FieldPair name="address" mappedName="Address" />
                  <FieldPair name="primary_phone" mappedName="Phone" />
                </div>
              </div>
            </div>

            {/* Account */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Account Object
              </div>
              <div className="collapse-content">
                <div className="grid grid-cols-2 gap-4">
                  <FieldMappingLabel />
                  <FieldPair name="name" mappedName="Name" />
                  <FieldPair name="industry" mappedName="Industry" />
                  <FieldPair name="description" mappedName="Description" />
                  <FieldPair name="website" mappedName="Website" />
                </div>
              </div>
            </div>

            {/* Opportunity */}
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Opportunity Object
              </div>
              <div className="collapse-content">
                <div className="grid grid-cols-2 gap-4">
                  <FieldMappingLabel />
                  <FieldPair name="name" mappedName="Name" />
                  <FieldPair name="amount" mappedName="Amount" />
                  <FieldPair name="stage" mappedName="Stage" />
                  <FieldPair name="status" mappedName="Status" />
                </div>
              </div>
            </div>
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
