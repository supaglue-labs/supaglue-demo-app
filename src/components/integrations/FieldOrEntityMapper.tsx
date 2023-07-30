import { EntityMapping, ObjectFieldMapping, Property } from "@/types/supaglue";
import { AccordionItem } from "./AccordionItem";
import IntegrationsHeader from "./IntegrationsHeader";
import { EntityMapper } from "./entities/EntityMapper";
import { FieldMapper } from "./objects/FieldMapper";

// For demo: show entity mapper if entities exist
// TODO: separate
export default function FieldOrEntityMapper({
  providerName,
  propertiesMap,
  objectFieldMappings,
  entityMappings,
}: {
  providerName: string;
  propertiesMap: Record<string, Property[]>;
  objectFieldMappings: ObjectFieldMapping[];
  entityMappings?: EntityMapping[];
}) {
  if (entityMappings) {
    return (
      <>
        <IntegrationsHeader>Entity Mappings</IntegrationsHeader>
        {entityMappings.length === 0 && (
          <div className="italic">No entities for field mapping.</div>
        )}
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
      </>
    );
  }

  return (
    <>
      <IntegrationsHeader>Field Mappings</IntegrationsHeader>
      {objectFieldMappings.length === 0 && (
        <div className="italic">No objects for field mapping.</div>
      )}
      <div className="join join-vertical w-full">
        {objectFieldMappings.map((objectFieldMapping, idx: number) => {
          return (
            <AccordionItem
              key={`AccordionItem_${idx}`}
              title={objectFieldMapping.object_name}
            >
              <FieldMapper
                providerName={providerName}
                fields={objectFieldMapping.fields}
                properties={propertiesMap[objectFieldMapping.object_name] || []}
                objectName={objectFieldMapping.object_name}
              />
            </AccordionItem>
          );
        })}
      </div>
    </>
  );
}
