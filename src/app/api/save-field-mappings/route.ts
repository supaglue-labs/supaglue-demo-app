import { API_HOST } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const data = await request?.json();

  const res = await fetch(
    `${API_HOST}/mgmt/v2/customers/${data?.customer_id}/connections/${data?.connection_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SUPAGLUE_API_KEY!,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    console.error(await res.text());
    return NextResponse.error();
  }

  const responseData = await res.json();

  return NextResponse.json(responseData);
}
