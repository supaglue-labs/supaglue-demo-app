"use client";

import { useCustomerContext } from "@/hooks/useCustomerContext";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { CompanyProspect } from "@/types/apolla";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";

export default function CompanyRow({
  company,
  isSynced,
  providerName,
}: {
  company: CompanyProspect;
  isSynced: boolean;
  providerName?: string;
}) {
  const router = useRouter();
  const activeCustomer = useCustomerContext();

  /**
   * Use SWR Mutation to allow your customers to create accounts in their connected CRM.
   * This edge function will hit api/create-crm-account/route.ts.
   */
  const { trigger, error, data, isMutating } = useSWRMutation(
    `/api/create-crm-account`,
    async (url, { arg }: { arg: any }) => {
      if (!providerName) {
        return new Response();
      }
      return await fetch(url, {
        method: "POST",
        headers: getHeadersWithCustomerProvider(
          activeCustomer.id,
          providerName
        ),
        body: JSON.stringify(arg),
      });
    }
  );

  useEffect(() => {
    if (data && data.ok) {
      router.refresh();
    } else if ((data && !data.ok) || error) {
      router.refresh();
    }
  }, [router, data, error]);

  return (
    <tr>
      <td>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </td>
      <td>{company.name}</td>
      <td>{company.industry}</td>
      <td>{company.website}</td>
      <td>{company.numOfEmployees}</td>
      <td>{company.phone}</td>
      <td>{isSynced ? "✅" : "-"}</td>
      <td>
        <button
          className={`min-w-[3rem] btn btn-secondary btn-outline btn-xs ${
            isSynced ? "btn-disabled" : ""
          }`}
          onClick={() => {
            trigger({
              record: {
                name: company.name,
                website: company.website,
                number_of_employees: company.numOfEmployees,
                phone_numbers: [
                  {
                    phone_number: company.phone,
                    phone_number_type: "primary",
                  },
                ],
              },
            });
          }}
        >
          {isMutating ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Add"
          )}
        </button>
      </td>
    </tr>
  );
}
