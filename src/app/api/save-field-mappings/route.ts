import { API_HOST } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const data = await request?.json();

  const res = await fetch(`${API_HOST}/mgmt/v2/field_mappings/_update_object`, {
    method: "PUT",
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
