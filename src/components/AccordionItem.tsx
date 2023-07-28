import { ObjectFieldMappings, Property } from "@/types/supaglue";
import { FieldMapper } from "./FieldMapper";

export function AccordionItem({
  object,
  providerName,
  properties,
}: {
  object: ObjectFieldMappings;
  providerName: string;
  properties: Property[];
}) {
  return (
    <div className="collapse collapse-arrow join-item border border-base-300">
      <input type="radio" name="my-accordion-4" />
      <div className="collapse-title text-xl font-medium">
        {object.object_name}
      </div>
      <div className="collapse-content">
        <FieldMapper
          providerName={providerName}
          fields={object.fields}
          properties={properties}
          objectName={object.object_name}
        />
      </div>
    </div>
  );
}
