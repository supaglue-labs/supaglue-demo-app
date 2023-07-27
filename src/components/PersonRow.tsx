"use client";

import { useCustomerContext } from "@/hooks/useCustomerContext";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { LibraryPerson } from "@/types/apolla";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";

export default function PersonRow({
  person,
  isSynced,
  providerName,
}: {
  person: LibraryPerson;
  isSynced: boolean;
  providerName: string;
}) {
  const router = useRouter();
  const activeCustomer = useCustomerContext();

  /**
   * Use SWR Mutation to allow your customers to create contacts in their connected CRM.
   * This edge function will hit api/create-crm-contact/route.ts.
   */
  const { trigger, error, data, isMutating } = useSWRMutation(
    `/api/create-crm-contact`,
    async (url, { arg }: { arg: any }) => {
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
      <td>{person.name}</td>
      <td>{person.title}</td>
      <td>{person.location}</td>
      <td>{person.email}</td>
      <td>{isSynced ? "✅" : ""}</td>
      <td
        className="cursor-pointer hover:text-accent-focus underline"
        onClick={() => {
          router.push(`/people/${encodeURIComponent(person.email)}`);
        }}
      >
        View
      </td>
      <td>
        <button
          className={`min-w-[3rem] btn btn-secondary btn-outline btn-xs ${
            isSynced ? "btn-disabled" : ""
          }`}
          onClick={() => {
            trigger({
              record: {
                first_name: person.name.split(" ")[0],
                last_name: person.name.split(" ")[1],
                email_addresses: [
                  {
                    email_address: person.email,
                    email_address_type: "primary",
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
