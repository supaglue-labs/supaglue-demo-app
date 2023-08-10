import { API_HOST } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

/**
 * Nextjs API Route that calls Supaglue's Management API to fetch properties.
 * https://docs.supaglue.com/api/v2/metadata/list-properties
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const res = await fetch(
    `${API_HOST}/metadata/v2/properties?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
        "x-customer-id": request.headers.get("x-customer-id")!,
        "x-provider-name": request.headers.get("x-provider-name")!,
      },
    }
  );

  if (!res.ok) {
    console.error(await res.text());
    return NextResponse.error();
  }

  const responseData = await res.json();

  return NextResponse.json(responseData);
}
