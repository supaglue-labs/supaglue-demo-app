import { API_HOST } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

/**
 * Nextjs API Route that calls Supaglue's CRM Action API to create an account.
 * https://docs.supaglue.com/api/v2/crm/create-account
 */
export async function POST(request: NextRequest) {
  const data = await request.json();

  const res = await fetch(`${API_HOST}/crm/v2/accounts`, {
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
