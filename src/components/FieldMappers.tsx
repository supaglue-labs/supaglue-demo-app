"use client";

import { getStagingEnvObjectType } from "@/lib/constants";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { FieldMapping } from "@/types/supaglue";
import { ChangeEventHandler, useEffect, useState } from "react";
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
  providerName,
  options = [],
  onChange,
  disabled,
}: {
  name: string;
  schemaMappedName?: string;
  customerMappedName?: string;
  providerName: string;
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
        data-tip={
          Boolean(schemaMappedName)
            ? "This is set by Apolla.io"
            : customerMappedName
        }
      >
        <select
          className="select w-full max-w-xs"
          onChange={onChange}
          disabled={disabled}
          defaultValue={schemaMappedName ?? customerMappedName}
        >
          <option disabled>{providerName} field</option>
          {schemaMappedName ? (
            <option>{schemaMappedName}</option>
          ) : (
            options.map((option, idx: number) => (
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
  const [message, setMessage] = useState("Saved.");
  const [showToast, setShowToast] = useState(false);

  /**
   * Use SWR Mutation to allow your customers to save their field mappings to your schema.
   * This edge function will hit api/save-field-mappings/route.ts.
   */
  const { trigger, error, data } = useSWRMutation(
    `/api/save-field-mappings`,
    async (url, { arg }: { arg: any }) => {
      return await fetch(url, {
        method: "PUT",
        headers: getHeadersWithCustomerProvider(providerName),
        body: JSON.stringify(arg),
      });
    }
  );

  useEffect(() => {
    if (data && data.ok) {
      setMessage("Saved.");
      setShowToast(true);
    } else if ((data && !data.ok) || error) {
      setMessage("Error.");
      setShowToast(true);
    }
  }, [data, error]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <FieldMappingLabel providerName={providerName} />
      {fields.map((fieldMapping, idx: number) => (
        <FieldPair
          key={`FieldPair_${idx}`}
          name={fieldMapping.name}
          providerName={providerName}
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
            type: getStagingEnvObjectType(providerName),
            name: objectName,
            field_mappings: fields.map((fieldMapping) => ({
              schema_field: fieldMapping.name,
              mapped_field: fieldMapping.customer_mapped_name,
            })),
          });
        }}
      >
        Save
      </button>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={message}
      />
    </div>
  );
}
