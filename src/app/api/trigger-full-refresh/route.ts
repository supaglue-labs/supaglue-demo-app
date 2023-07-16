import { API_HOST } from "@/lib/constants";
import { NextResponse } from "next/server";

/**
 * Nextjs API Route that calls Supaglue's Management API to trigger a full refresh of data for an object.
 * https://docs.supaglue.com/api/v2/mgmt/trigger-sync
 */
export async function POST(request: Request) {
  const data = await request?.json();

  const res = await fetch(`${API_HOST}/mgmt/v2/syncs/_trigger`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
      "x-customer-id": request.headers.get("x-customer-id")!,
      "x-provider-name": request.headers.get("x-provider-name")!,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error(await res.text());
    return NextResponse.error();
  }

  const responseData = await res.json();

  return NextResponse.json(responseData);
}