import { fetchCrmContactsByEmails } from "@/app/remote/postgres/fetch_crm_contacts";
import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
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

function Field({ label = "", field = "" }: { label: string; field?: string }) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        disabled
        className="input input-bordered w-full max-w-xs"
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
  const activeEmail = decodeURIComponent(email);
  const crmContacts = await fetchCrmContactsByEmails("salesforce", [
    activeEmail,
  ]);

  const person = peopleLibrary.find((contact) => contact.email === activeEmail);
  const isSynced = crmContacts.some(
    (crmContact) => crmContact.emailAddress === activeEmail
  );
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
      </Content>
    </>
  );
}
