import { apollaPrismaClient, supagluePrismaClient } from "@/remote/prisma";
import { inngest } from "./client";
import { remoteAccountToApollaAccount } from "./mappers/account";
import { remoteContactToApollaContact } from "./mappers/contact";

export const transformAndWriteObject = inngest.createFunction(
  { name: "Transform and write object records" },
  { event: "etl/transform_and_write_object_records" },
  async ({ event, step, logger }) => {
    const {
      type: dataModel, // data model
      entity_name: entityName,
      provider_name: providerName,
    } = event.data;

    if (dataModel !== "entity") {
      return { event, body: true };
    }

    await step.run(
      "Read all records for one object type, transform, and write to destination",
      async () => {
        logger.info("Step run entered", { entityName });

        if (entityName === "account") {
          const supaglueRecords =
            await supagluePrismaClient.entity_account.findMany();
          logger.info("Source records", { length: supaglueRecords.length });

          for (const supaglueRecord of supaglueRecords) {
            const mappedData = supaglueRecord.supaglue_mapped_data as any;

            const apollaCreateRecord = remoteAccountToApollaAccount(
              providerName,
              mappedData
            );

            const apollaUpdateRecord = {
              id: supaglueRecord.supaglue_id,
              ...apollaCreateRecord,
            };

            await apollaPrismaClient.apolla_account.upsert({
              where: {
                id: supaglueRecord.supaglue_id,
              },
              create: apollaCreateRecord,
              update: apollaUpdateRecord,
            });
            logger.info("Upserted", { id: supaglueRecord.supaglue_id });
          }
        } else if (entityName === "contact") {
          const supaglueRecords =
            await supagluePrismaClient.entity_contact.findMany();
          logger.info("Source records", { length: supaglueRecords.length });

          for (const supaglueRecord of supaglueRecords) {
            const mappedData = supaglueRecord.supaglue_mapped_data as any;

            const apollaCreateRecord = remoteContactToApollaContact(
              providerName,
              mappedData
            );

            const apollaUpdateRecord = {
              id: supaglueRecord.supaglue_id,
              ...apollaCreateRecord,
            };

            await apollaPrismaClient.apolla_contact.upsert({
              where: {
                id: supaglueRecord.supaglue_id,
              },
              create: apollaCreateRecord,
              update: apollaUpdateRecord,
            });
            logger.info("Upserted", { id: supaglueRecord.supaglue_id });
          }
        }
      }
    );

    return { event, body: true };
  }
);
