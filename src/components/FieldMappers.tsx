"use client";

import { CUSTOMER_ID } from "@/lib/constants";
import { ChangeEventHandler } from "react";
import useSWRMutation from "swr/mutation";

function FieldMappingLabel({ providerName }: { providerName: string }) {
  return (
    <>
      <label className="label">
        <span className="label-text underline">Apolla.io field</span>
      </label>
      <label className="label">
        <span className="label-text underline">Your {providerName} field</span>
      </label>
    </>
  );
}

function FieldPair({
  name,
  mappedName,
  options = [],
  onChange,
}: {
  name: string;
  mappedName?: string;
  options: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <>
      <input
        type="text"
        disabled={true}
        className="input input-bordered w-full max-w-xs"
        defaultValue={name}
      />
      <select className="select w-full max-w-xs" onChange={onChange}>
        <option disabled defaultValue={mappedName}>
          Salesforce field
        </option>
        {mappedName ? (
          <option>{mappedName}</option>
        ) : (
          options.map((option, idx) => (
            <option key={option} value={option} data-idx={idx}>
              {option}
            </option>
          ))
        )}
      </select>
    </>
  );
}

export function FieldMappers({
  connectionId,
  providerName,
  fields,
  objectName,
  propertiesMap,
}: {
  connectionId: string;
  providerName: string;
  fields: { name: string; mapped_name: string }[];
  objectName: string;
  propertiesMap: any;
}) {
  const { trigger } = useSWRMutation(
    `/api/save-field-mappings`,
    async (url, { arg }: { arg: any }) => {
      await fetch(url, {
        method: "PATCH",
        body: JSON.stringify(arg),
      });
    }
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <FieldMappingLabel providerName={providerName} />
      {fields?.map((fieldMapping: any, idx: number) => (
        <FieldPair
          key={`FieldPair_${idx}`}
          name={fieldMapping.name}
          mappedName={fieldMapping.mapped_name}
          options={[undefined, ...propertiesMap[objectName]?.properties]}
          onChange={(event) => {
            fields[idx].mapped_name = event.target.value;
          }}
        />
      ))}
      <div></div>
      <button
        className="btn btn-primary"
        onClick={() => {
          trigger({
            customer_id: CUSTOMER_ID,
            connection_id: connectionId,
            schema_mappings_config: {
              standard_objects: [
                {
                  object: objectName,
                  field_mappings: fields?.map((fieldMapping: any) => ({
                    schema_field: fieldMapping.name,
                    mapped_field: fieldMapping.mapped_name, //,
                  })),
                },
              ],
            },
          });
        }}
      >
        Save
      </button>
    </div>
  );
}
