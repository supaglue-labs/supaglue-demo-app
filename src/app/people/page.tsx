import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import PersonRow from "@/components/PersonRow";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { peopleProspects } from "@/lib/prospects_database";
import { fetchCrmContactsByEmails } from "@/remote/postgres/fetch_crm_contacts";
import { fetchActiveConnection } from "@/remote/supaglue/fetch_active_connection";
import { cookies } from "next/headers";

async function PeopleTable() {
  // Note: force Dynamic Rendering
  const cookieStore = cookies();

  const activeCustomer = useCustomerContext();
  const activeConnection = await fetchActiveConnection(activeCustomer.id);

  const crmContactPageMatches = await fetchCrmContactsByEmails(
    activeCustomer.id,
    activeConnection.provider_name,
    peopleProspects.map((person) => person.email)
  );

  return (
    <div className="overflow-x-auto">
      {/* Menu Bar */}
      <div className="flex gap-4 my-4">
        <button className="btn btn-primary btn-outline btn-sm">
          Add to Sequence
        </button>
        <button className="btn btn-primary btn-outline btn-sm">Email</button>
        <button className="btn btn-primary btn-outline btn-sm">Export</button>
      </div>

      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>title</th>
            <th>location</th>
            <th>Email</th>
            <th>Synced to CRM</th>
            <th>Profile</th>
            <th>Quick Actions</th>
          </tr>
        </thead>
        <tbody>
          {peopleProspects.map((person, idx) => (
            <PersonRow
              key={`Person_${idx}`}
              person={person}
              providerName={activeConnection.provider_name}
              isSynced={crmContactPageMatches.some(
                (crmContact) => crmContact.emailAddress === person.email
              )}
            />
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="w-full flex justify-end my-4">
        <div className="join grid grid-cols-2">
          <button className="join-item btn btn-sm btn-outline">
            Previous page
          </button>
          <button className="join-item btn btn-sm btn-outline">Next</button>
        </div>
      </div>
    </div>
  );
}

export default function People() {
  return (
    <>
      <Nav title="People" />
      <Content>
        <PeopleTable />
      </Content>
    </>
  );
}
