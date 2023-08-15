import {
  apollaPrismaClient,
  supagluePrismaClient,
} from "@/remote/postgres/prisma";
import { inngest } from "./client";

export const transformAndWriteObject = inngest.createFunction(
  { name: "Transform and write object records" },
  { event: "etl/transform_and_write_object_records" },
  async ({ event, step, logger }) => {
    const {
      type: dataModel, // data model
      entity_name: entityName,
    } = event.data;

    if (dataModel !== "entity") {
      return { event, body: true };
    }

    await step.run(
      "Read all records for one object type, transform, and write to destination",
      async () => {
        if (entityName === "account") {
          const supaglueRecords =
            await supagluePrismaClient.entity_account.findMany();

          await supaglueRecords.forEach(async (supaglueRecord) => {
            const mappedData = supaglueRecord.supaglue_mapped_data as any;

            const apollaCreateRecord = {
              name: mappedData.name,
              domain: mappedData.domain,
              lifecycle_stage: mappedData.stage,
              updated_at: new Date(),
            };

            const apollaUpdateRecord = {
              id: supaglueRecord.id,
              ...apollaCreateRecord,
            };

            await apollaPrismaClient.apolla_account.upsert({
              where: {
                id: supaglueRecord.id,
              },
              create: apollaCreateRecord,
              update: apollaUpdateRecord,
            });
          });
        } else if (entityName === "contact") {
          const supaglueRecords =
            await supagluePrismaClient.entity_contact.findMany();

          await supaglueRecords.forEach(async (supaglueRecord) => {
            const mappedData = supaglueRecord.supaglue_mapped_data as any;

            const apollaCreateRecord = {
              name: mappedData.name,
              email_address: mappedData.email,
              updated_at: new Date(),
            };

            const apollaUpdateRecord = {
              id: supaglueRecord.id,
              ...apollaCreateRecord,
            };

            await apollaPrismaClient.apolla_contact.upsert({
              where: {
                id: supaglueRecord.id,
              },
              create: apollaCreateRecord,
              update: apollaUpdateRecord,
            });
          });
        }
      }
    );

    return { event, body: true };
  }
);
