import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { fetchCrmContactsByEmails } from "@/remote/postgres/fetch_crm_contacts";
import { fetchActiveConnection } from "@/remote/supaglue/fetch_active_connection";
import { peopleLibrary } from "../page";

function Avatar() {
  return (
    <div className="avatar placeholder">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
        <span className="text-3xl">K</span>
      </div>
    </div>
  );
}

function Field({
  label = "",
  field = "",
  showCrmBadge = false,
  className,
}: {
  label: string;
  field?: string;
  showCrmBadge?: boolean;
  className?: string;
}) {
  return (
    <div className={`form-control w-full ${className}`}>
      <label className="label">
        <div className="label-text gap-2 flex items-center w-full">
          {label}
          {showCrmBadge && (
            <div className="badge badge-accent badge-xs badge-outline">
              CRM data
            </div>
          )}
        </div>
      </label>
      <input
        type="text"
        placeholder="Type here"
        disabled
        className="input input-bordered w-full"
        defaultValue={field}
      />
    </div>
  );
}

function CheckBox({ isSynced }: { isSynced: boolean }) {
  return (
    <div className="form-control max-w-xs w-full">
      <label className="cursor-pointer label">
        <span className="label-text">Synced to CRM</span>
        <input
          type="checkbox"
          checked={isSynced}
          className="checkbox checkbox-accent"
          disabled
        />
      </label>
    </div>
  );
}

export default async function Person({
  params: {
    email: [email],
  },
}: {
  params: { email: string[] };
}) {
  const activeCustomer = useCustomerContext();
  const activeConnection = await fetchActiveConnection(activeCustomer.id);
  const activeEmail = decodeURIComponent(email);
  const crmContacts = await fetchCrmContactsByEmails(
    activeCustomer.id,
    activeConnection.provider_name,
    [activeEmail]
  );

  const person = peopleLibrary.find((contact) => contact.email === activeEmail);
  const crmContact = crmContacts.find(
    (crmContact) => crmContact.emailAddress === activeEmail
  );
  const isSynced = Boolean(crmContact);
  return (
    <>
      <Nav title="Person" />
      <Content>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Avatar />
          </div>
          <div>
            <Field label="Name" field={person?.name} />
            <Field label="Email" field={person?.email} />
            <CheckBox isSynced={isSynced} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div></div>
        </div>

        <Field
          className="w-full"
          label="Address"
          field={`${crmContact?.addresses[0]?.street_1} ${crmContact?.addresses[0]?.city}, ${crmContact?.addresses[0]?.state} ${crmContact?.addresses[0]?.country}`}
          showCrmBadge={true}
        />
        <div className="w-full">
          <label className="label">
            <div className="label-text gap-2 flex items-center w-full">
              Other
              <div className="badge badge-accent badge-xs badge-outline">
                CRM data
              </div>
            </div>
          </label>
          <textarea
            disabled
            rows={15}
            className="w-full textarea textarea-bordered"
            defaultValue={JSON.stringify(crmContact?.rawData, null, 3)}
          ></textarea>
        </div>
      </Content>
    </>
  );
}
