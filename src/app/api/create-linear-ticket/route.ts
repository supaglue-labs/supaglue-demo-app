import { API_HOST, SUPAGLUE_LINEAR_TEAM_ID } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

/**
 * Nextjs API Route that calls Supaglue's Action API to create a ticke tin Linear.
 * https://docs.supaglue.com/api/v2/actions/send-passthrough-request
 */
export async function POST(request: NextRequest) {
  const data = await request.json();

  const res = await fetch(`${API_HOST}/actions/v2/passthrough`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
      "x-customer-id": request.headers.get("x-customer-id")!,
      "x-provider-name": "linear",
    },
    body: JSON.stringify({
      path: "",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation IssueCreate {
        issueCreate(
          input: {
            title: "${data.title}"
            description: "${data.description}"
            teamId: "${SUPAGLUE_LINEAR_TEAM_ID}"
          }
        ) {
          success
          issue {
            id
            title
          }
        }
      }`,
      }),
    }),
  });

  if (!res.ok) {
    console.error(await res.text());
    return NextResponse.error();
  }

  const responseData = await res.json();
  return NextResponse.json(responseData);
}
