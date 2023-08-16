import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import PersonRow from "@/components/people/PersonRow";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { peopleProspects } from "@/lib/prospects_database";
import { fetchContactsByEmails } from "@/remote/apolla/fetch_contacts";
import { fetchActiveConnection } from "@/remote/supaglue/fetch_active_connection";
import { ApollaContact } from "@/types/apolla";
import { cookies } from "next/headers";
import Link from "next/link";

async function PeopleTable() {
  // Note: force Dynamic Rendering
  const cookieStore = cookies();

  const activeCustomer = useCustomerContext();
  const activeConnection = await fetchActiveConnection(activeCustomer.id);

  let apollaContactPageMatches: ApollaContact[] = [];
  if (activeConnection) {
    apollaContactPageMatches = await fetchContactsByEmails(
      peopleProspects.map((person) => person.email)
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Menu Bar */}
      <div className="flex gap-4 my-4 items-center">
        <button className="btn btn-primary btn-outline btn-sm">
          Add to Sequence
        </button>
        <button className="btn btn-primary btn-outline btn-sm">Email</button>
        <button className="btn btn-primary btn-outline btn-sm">Export</button>
        <span>
          {!activeConnection && (
            <Link className="link link-neutral italic" href="/integrations">
              Connect a CRM
            </Link>
          )}
        </span>
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
              providerName={activeConnection?.provider_name}
              isSynced={apollaContactPageMatches.some(
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
