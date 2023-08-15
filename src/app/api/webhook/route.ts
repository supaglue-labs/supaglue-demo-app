import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (data.webhook_event_type !== "sync.complete") {
    return NextResponse.json({});
  }

  await inngest.send({
    name: `etl/transform_and_write_object_records`,
    data: {
      event_type: data.webhook_event_type, // `sync.complete`
      type: data.type, // `entity`
      entity_name: data.entity_name,
    },
  });

  return NextResponse.json({});
}
