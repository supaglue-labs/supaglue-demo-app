"use client";

import { getHeaders } from "@/app/api/helper";
import { FieldMapping } from "@/app/types";
import { ChangeEventHandler, useState } from "react";
import useSWRMutation from "swr/mutation";
import { Toast } from "./Toast";

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
  schemaMappedName,
  customerMappedName,
  options = [],
  onChange,
  disabled,
}: {
  name: string;
  schemaMappedName?: string;
  customerMappedName?: string;
  options: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  disabled: boolean;
}) {
  return (
    <>
      <input
        type="text"
        disabled={true}
        className="input input-bordered w-full max-w-xs"
        defaultValue={name}
      />
      <div
        className="tooltip"
        data-tip={Boolean(schemaMappedName) && "This is set by Apolla.io"}
      >
        <select
          className="select w-full max-w-xs"
          onChange={onChange}
          disabled={disabled}
          defaultValue={schemaMappedName ?? customerMappedName}
        >
          <option disabled>Salesforce field</option>
          {schemaMappedName ? (
            <option>{schemaMappedName}</option>
          ) : (
            options.map((option, idx) => (
              <option key={option} value={option} data-idx={idx}>
                {option}
              </option>
            ))
          )}
        </select>
      </div>
    </>
  );
}

export function FieldMappers({
  providerName,
  fields,
  objectName,
  properties,
}: {
  providerName: string;
  fields: FieldMapping[];
  objectName: string;
  properties: string[];
}) {
  const [showToast, setShowToast] = useState(false);

  const { trigger } = useSWRMutation(
    `/api/save-field-mappings`,
    async (url, { arg }: { arg: any }) => {
      await fetch(url, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(arg),
      });
    }
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <FieldMappingLabel providerName={providerName} />
      {fields.map((fieldMapping: any, idx: number) => (
        <FieldPair
          key={`FieldPair_${idx}`}
          name={fieldMapping.name}
          disabled={Boolean(fieldMapping.schema_mapped_name)}
          schemaMappedName={fieldMapping.schema_mapped_name}
          customerMappedName={fieldMapping.customer_mapped_name}
          options={[undefined, ...properties]}
          onChange={(event) => {
            fields[idx].customer_mapped_name = event.target.value;
          }}
        />
      ))}
      <div></div>
      <button
        className="btn btn-primary"
        onClick={() => {
          trigger({
            type: "standard",
            name: objectName,
            field_mappings: fields.map((fieldMapping: any) => ({
              schema_field: fieldMapping.name,
              mapped_field: fieldMapping.customer_mapped_name,
            })),
          });
          setShowToast(true);
        }}
      >
        Save
      </button>
      <Toast show={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}
