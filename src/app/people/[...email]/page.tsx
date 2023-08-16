import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { peopleProspects } from "@/lib/prospects_database";
import { fetchContactsByEmails } from "@/remote/apolla/fetch_contacts";
import { fetchActiveConnection } from "@/remote/supaglue/fetch_active_connection";
import { ApollaContact } from "@/types/apolla";
import Link from "next/link";

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

async function CheckBox({ isSynced }: { isSynced: boolean }) {
  const activeCustomer = useCustomerContext();
  const activeConnection = await fetchActiveConnection(activeCustomer.id);

  return (
    <div className="form-control max-w-xs w-full">
      <label className="label">
        <span className="label-text">Synced to CRM</span>
        <input
          type="checkbox"
          checked={isSynced}
          className="checkbox checkbox-accent cursor-default"
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
  let apollaContacts: ApollaContact[] = [];

  if (activeConnection) {
    apollaContacts = await fetchContactsByEmails([activeEmail]);
  }

  const person = peopleProspects.find(
    (contact) => contact.email === activeEmail
  );
  const apollaContact = apollaContacts.find(
    (apollaContact) => apollaContact.emailAddress === activeEmail
  );
  const isSynced = Boolean(apollaContact);
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

        {!activeConnection && (
          <Link className="link link-neutral italic" href="/integrations">
            Connect a CRM to see more data
          </Link>
        )}
        {activeConnection && (
          <>
            <Field
              className="w-full"
              label="Address"
              field={apollaContact?.address ?? ""}
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
                defaultValue={JSON.stringify(apollaContact, null, 3)}
              ></textarea>
            </div>
          </>
        )}
      </Content>
    </>
  );
}
