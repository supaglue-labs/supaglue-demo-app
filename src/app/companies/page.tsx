import CompanyRow from "@/components/companies/CompanyRow";
import { Content } from "@/components/Content";
import { Nav } from "@/components/Nav";
import { useCustomerContext } from "@/hooks/useCustomerContext";
import { companyProspects } from "@/lib/prospects_database";
import { fetchCrmAccountsByWebsite } from "@/remote/postgres/fetch_crm_accounts";
import { fetchActiveConnection } from "@/remote/supaglue/fetch_active_connection";
import { CrmAccount } from "@/types/apolla";
import { cookies } from "next/headers";
import Link from "next/link";

async function CompanyTable() {
  // Note: force Dynamic Rendering
  const cookieStore = cookies();

  const activeCustomer = useCustomerContext();
  const activeConnection = await fetchActiveConnection(activeCustomer.id);

  let crmAccountPageMatches: CrmAccount[] = [];

  if (activeConnection) {
    crmAccountPageMatches = await fetchCrmAccountsByWebsite(
      activeCustomer.id,
      activeConnection.provider_name,
      companyProspects.map((company) => company.website)
    );
  }

  return (
    <div className="overflow-x-auto">
      {/* Menu Bar */}
      <div className="flex gap-4 my-4 items-center">
        <button className="btn btn-primary btn-outline btn-sm">+ Save</button>
        <button className="btn btn-primary btn-outline btn-sm">
          Find People
        </button>
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
            <th>Industry</th>
            <th>Website</th>
            <th>Num of employees</th>
            <th>Phone</th>
            <th>Saved to CRM</th>
            <th>Quick Actions</th>
          </tr>
        </thead>
        <tbody>
          {companyProspects.map((company, idx) => (
            <CompanyRow
              company={company}
              key={`Company_${idx}`}
              providerName={activeConnection?.provider_name}
              isSynced={crmAccountPageMatches.some(
                (crmAccount) => crmAccount.website === company.website
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

export default function Companies() {
  return (
    <>
      <Nav title="Companies" />
      <Content>
        <CompanyTable />
      </Content>
    </>
  );
}
