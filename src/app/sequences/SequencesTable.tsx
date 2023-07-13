"use client";

import { useRouter } from "next/navigation";

export function SequencesTable() {
  const router = useRouter();

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Active</th>
            <th>Paused</th>
            <th>Enabled</th>
            <th>Not sent</th>
            <th>Bounced</th>
            <th>Spam Blocked</th>
            <th>Finished</th>
            <th>Scheduled</th>
            <th>Delivered</th>
            <th>Reply</th>
            <th>Interested</th>
            <th>Enabled</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          <tr
            className="cursor-pointer hover:bg-accent-focus"
            onClick={() => {
              router.push("/sequences/stage-based-targeting-at-risk-customers");
            }}
          >
            <th></th>
            <td>Stage-based targeting: At-risk customers</td>
            <td>-</td>
            <td>1</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>
              <input
                type="checkbox"
                className="toggle toggle-accent"
                checked
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
