import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import PersonRow from "@/components/PersonRow";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { fetchCrmContactsByEmails } from "@/remote/postgres/fetch_crm_contacts";
import { fetchActiveConnection } from "@/remote/supaglue/fetch_active_connection";
import { LibraryPerson } from "@/types/apolla";

export const peopleLibrary: LibraryPerson[] = [
  {
    name: "Avi Green",
    title: "CFO",
    location: "United Oil & Gas Corp.",
    email: "agree@1auog.com",
  },
  {
    name: "Siddartha Nedaerk",
    title: "-",
    location: "San Francisco, CA",
    email: "si@1anedaerk.com",
  },
  {
    name: "Sara Smith",
    title: "Director of Engineering",
    location: "San Francisco, CA",
    email: "sar@1agmail.com",
  },
  {
    name: "Brice Swyre",
    title: "SVP, Procurement",
    location: "New York, NY",
    email: "ros@1aedge.com",
  },
  {
    name: "Marjy Marge",
    title: "CFO",
    location: "Austin, TX",
    email: "sea@1aedge.com",
  },
  {
    name: "Yancy Tear",
    title: "VP, Facilities",
    location: "Portland, Oregon",
    email: "jroge@1aburlington.com",
  },
  {
    name: "Irma Vasilik",
    title: "Editor",
    location: "New York, NY",
    email: "irm@1anytimes.com",
  },
  {
    name: "Meghann Durtnal",
    title: "Staff Accountant IV",
    location: "Tucson, AZ",
    email: "ajame@1auog.com",
  },
  {
    name: "Dorothy Durtnal",
    title: "Staff Accountant IV",
    location: "Tucson, AZ",
    email: "do@1adurtnal.com",
  },
  {
    name: "Sammy Seston",
    title: "Accountant I",
    location: "Mountain View, CA",
    email: "tryple@1auog.com",
  },
  {
    name: "Lesya Tinhim",
    title: "Safety Technician IV",
    location: "Singapore, Singapore",
    email: "ibol@1auog.com",
  },
  {
    name: "Zaneta Tewkesbury",
    title: "VP Marketing",
    location: "Chicago, IL",
    email: "za@1atewk.com",
  },
  {
    name: "Nyssa Barrera",
    title: "Marketing Manager",
    location: "Chicago, IL",
    email: "lore@1aoutlook.net",
  },
  {
    name: "Andy Tipple",
    title: "Librarian",
    location: "Gateshead, Tyne and Wear NE26, UK",
    email: "ason@1auog.com",
  },
  {
    name: "Sophi Biles",
    title: "Recruiting Manager",
    location: "Chicago, IL",
    email: "spavlov@1auog.com",
  },
  {
    name: "Florida Garces",
    title: "Web Developer IV",
    location: "Chicago, IL",
    email: "bond_joh@1agrandhotels.com",
  },
  {
    name: "Maribeth Popping",
    title: "Analyst Programmer",
    location: "Mountain View, CA",
    email: "pa@1apyramid.net",
  },
  {
    name: "Moritz Dryburgh",
    title: "Dental Hygienist",
    location: "Singapore, Singapore",
    email: "efran@1agenepoint.com",
  },
  {
    name: "Reid Semiras",
    title: "Teacher",
    location: "Singapore, Singapore",
    email: "asong@1auog.com",
  },
];

import { cookies } from "next/headers";

async function PeopleTable() {
  // Note: force Dynamic Rendering
  const cookieStore = cookies();

  const activeCustomer = useCustomerContext();
  const activeConnection = await fetchActiveConnection(activeCustomer.id);

  const crmContactPageMatches = await fetchCrmContactsByEmails(
    activeCustomer.id,
    activeConnection.provider_name,
    peopleLibrary.map((person) => person.email)
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
          {peopleLibrary.map((person, idx) => (
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
