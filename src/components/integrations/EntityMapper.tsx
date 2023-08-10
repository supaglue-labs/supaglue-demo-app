import { EntityMapping } from "@/types/supaglue";
import { AccordionItem } from "./AccordionItem";
import IntegrationsHeader from "./IntegrationsHeader";
import { EntityMapper } from "./entities/EntityMapper";

export default function EntityMapperComponent({
  providerName,
  entityMappings,
}: {
  providerName: string;
  entityMappings: EntityMapping[];
}) {
  return (
    <>
      <IntegrationsHeader>Entity Mappings</IntegrationsHeader>
      {entityMappings.length === 0 ? (
        <div className="italic">No entities to map.</div>
      ) : (
        <div className="join join-vertical w-full">
          {entityMappings.map((entityMapping, idx: number) => {
            return (
              <AccordionItem
                key={`AccordionItem_${idx}`}
                title={entityMapping.entity_name}
              >
                <EntityMapper
                  entityMapping={entityMapping}
                  providerName={providerName}
                />
              </AccordionItem>
            );
          })}
        </div>
      )}
    </>
  );
}
