import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import PersonRow from "@/components/PersonRow";
import { fetchCrmContactsByEmails } from "@/remote/postgres/fetch_crm_contacts";
import { LibraryPerson } from "@/types/apolla";

export const peopleLibrary: LibraryPerson[] = [
  {
    name: "Avi Green",
    title: "CFO",
    location: "United Oil & Gas Corp.",
    email: "agree@auog.com",
  },
  {
    name: "Siddartha Nedaerk",
    title: "-",
    location: "San Francisco, CA",
    email: "si@anedaerk.com",
  },
  {
    name: "Sara Smith",
    title: "Director of Engineering",
    location: "San Francisco, CA",
    email: "sar@agmail.com",
  },
  {
    name: "Brice Swyre",
    title: "SVP, Procurement",
    location: "New York, NY",
    email: "ros@aedge.com",
  },
  {
    name: "Marjy Marge",
    title: "CFO",
    location: "Austin, TX",
    email: "sea@aedge.com",
  },
  {
    name: "Yancy Tear",
    title: "VP, Facilities",
    location: "Portland, Oregon",
    email: "jroge@aburlington.com",
  },
  {
    name: "Irma Vasilik",
    title: "Editor",
    location: "New York, NY",
    email: "irm@anytimes.com",
  },
  {
    name: "Meghann Durtnal",
    title: "Staff Accountant IV",
    location: "Tucson, AZ",
    email: "ajame@auog.com",
  },
  {
    name: "Dorothy Durtnal",
    title: "Staff Accountant IV",
    location: "Tucson, AZ",
    email: "do@adurtnal.com",
  },
  {
    name: "Sammy Seston",
    title: "Accountant I",
    location: "Mountain View, CA",
    email: "tryple@auog.com",
  },
  {
    name: "Lesya Tinhim",
    title: "Safety Technician IV",
    location: "Singapore, Singapore",
    email: "ibol@auog.com",
  },
  {
    name: "Zaneta Tewkesbury",
    title: "VP Marketing",
    location: "Chicago, IL",
    email: "za@atewk.com",
  },
  {
    name: "Nyssa Barrera",
    title: "Marketing Manager",
    location: "Chicago, IL",
    email: "lore@aoutlook.net",
  },
  {
    name: "Andy Tipple",
    title: "Librarian",
    location: "Gateshead, Tyne and Wear NE26, UK",
    email: "ason@auog.com",
  },
  {
    name: "Sophi Biles",
    title: "Recruiting Manager",
    location: "Chicago, IL",
    email: "spavlov@auog.com",
  },
  {
    name: "Florida Garces",
    title: "Web Developer IV",
    location: "Chicago, IL",
    email: "bond_joh@agrandhotels.com",
  },
  {
    name: "Maribeth Popping",
    title: "Analyst Programmer",
    location: "Mountain View, CA",
    email: "pa@apyramid.net",
  },
  {
    name: "Moritz Dryburgh",
    title: "Dental Hygienist",
    location: "Singapore, Singapore",
    email: "efran@agenepoint.com",
  },
  {
    name: "Reid Semiras",
    title: "Teacher",
    location: "Singapore, Singapore",
    email: "asong@auog.com",
  },
];

async function PeopleTable() {
  const crmContactPageMatches = await fetchCrmContactsByEmails(
    "salesforce",
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
