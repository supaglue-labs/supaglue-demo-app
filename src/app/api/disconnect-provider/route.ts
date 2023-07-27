import { API_HOST } from "@/lib/env";
import { NextResponse } from "next/server";

/**
 * Nextjs API Route that calls Supaglue's CRM Management API to disconnect a provider.
 * https://docs.supaglue.com/api/v2/mgmt/delete-connection
 */
export async function POST(request: Request) {
  const data = await request.json();

  const res = await fetch(
    `${API_HOST}/mgmt/v2/customers/${data.customerId}/connections/${data.connectionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
        "x-customer-id": request.headers.get("x-customer-id")!,
        "x-provider-name": request.headers.get("x-provider-name")!,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    console.error(await res.text());
    return NextResponse.error();
  }

  let responseData = {};

  try {
    responseData = await res.json();
  } catch (err) {}

  return NextResponse.json(responseData);
}
