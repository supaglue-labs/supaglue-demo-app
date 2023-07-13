"use client";

import { getStagingActionApiProviderName } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { getHeadersWithCustomerProvider } from "../api/helper";
import { LibraryPerson } from "../types/apolla";

export default function PersonRow({
  person,
  isSynced,
}: {
  person: LibraryPerson;
  isSynced: boolean;
}) {
  const [message, setMessage] = useState("Created Contact.");
  const [showToast, setShowToast] = useState(false);

  const router = useRouter();
  const { trigger, error, data } = useSWRMutation(
    `/api/create-crm-contact`,
    async (url, { arg }: { arg: any }) => {
      return await fetch(url, {
        method: "POST",
        headers: getHeadersWithCustomerProvider(
          getStagingActionApiProviderName()
        ),
        body: JSON.stringify(arg),
      });
    }
  );

  useEffect(() => {
    if (data && data.ok) {
      setMessage("Created Contact.");
      setShowToast(true);
    } else if ((data && !data.ok) || error) {
      setMessage("Error.");
      setShowToast(true);
    }
  }, [data, error]);

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
          className={`btn btn-secondary btn-outline btn-xs ${
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
          Add
        </button>
        <button className="btn btn-secondary btn-outline btn-xs">Call</button>
      </td>
    </tr>
  );
}
