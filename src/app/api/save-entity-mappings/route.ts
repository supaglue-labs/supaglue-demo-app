import { API_HOST } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

/**
 * Nextjs API Route that calls Supaglue's Management API to allow your customer to map their CRM fields to your schema.
 * https://docs.supaglue.com/api/v2/mgmt/upsert-entity-mapping
 */
export async function PUT(request: NextRequest) {
  const data = await request.json();

  const res = await fetch(
    `${API_HOST}/mgmt/v2/entity_mappings/${data.entity_id}`,
    {
      method: "PUT",
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

  const responseData = await res.text();

  return NextResponse.json(responseData);
}
