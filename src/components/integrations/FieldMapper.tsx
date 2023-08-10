import { ObjectFieldMapping, Property } from "@/types/supaglue";
import { AccordionItem } from "./AccordionItem";
import IntegrationsHeader from "./IntegrationsHeader";
import { FieldMapper } from "./objects/FieldMapper";

export default function FieldMapperComponent({
  providerName,
  propertiesMap,
  objectFieldMappings,
}: {
  providerName: string;
  propertiesMap: Record<string, Property[]>;
  objectFieldMappings: ObjectFieldMapping[];
}) {
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
