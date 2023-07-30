"use client";

import { useCustomerContext } from "@/hooks/useCustomerContext";
import { DATA_MODEL } from "@/lib/env";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { FieldMapping, Property } from "@/types/supaglue";
import { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import MapperLabel from "../../MapperLabel";
import { Toast } from "../../Toast";
import FieldPair from "../FieldPair";

export function FieldMapper({
  providerName,
  fields,
  objectName,
  properties,
}: {
  providerName: string;
  fields: FieldMapping[];
  objectName: string;
  properties: Property[];
}) {
  const [message, setMessage] = useState("Saved.");
  const [showToast, setShowToast] = useState(false);
  const [shouldFullRefresh, setShouldFullRefresh] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [draftFields, setDraftFields] = useState(
    fields.map((field) => ({
      schema_field: field.name,
      mapped_field: field.customer_mapped_name,
    })) // TODO: change schema get/put interface to remove mapping
  );
  const activeCustomer = useCustomerContext();

  /**
   * Use SWR Mutation to allow your customers to save their field mappings to your schema.
   * This edge function will hit api/save-field-mappings/route.ts.
   */
  const { trigger, error, data } = useSWRMutation(
    `/api/save-field-mappings`,
    async (url, { arg }: { arg: any }) => {
      return await fetch(url, {
        method: "PUT",
        headers: getHeadersWithCustomerProvider(
          activeCustomer.id,
          providerName
        ),
        body: JSON.stringify(arg),
      });
    }
  );

  /**
   * Use SWR Mutation to trigger a full refresh of the respective object after field mapping changes.
   * This edge function will hit api/save-field-mappings/route.ts.
   */
  const {
    trigger: triggerFullRefresh,
    error: fullRefreshError,
    data: fullRefreshData,
  } = useSWRMutation(
    `/api/trigger-full-refresh`,
    async (url, { arg }: { arg: any }) => {
      return await fetch(url, {
        method: "POST",
        headers: getHeadersWithCustomerProvider(
          activeCustomer.id,
          providerName
        ),
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

  useEffect(() => {
    const hasAllFieldsMapped = !draftFields.some(
      (draftField) =>
        draftField.mapped_field === "" || draftField.mapped_field === undefined
    );
    setCanSave(hasAllFieldsMapped);
  }, [draftFields]);

  const emptyOption = { id: "", label: "" };

  return (
    <div className="grid grid-cols-2 gap-4">
      <MapperLabel providerName={providerName} />
      {draftFields.map((draftFieldMapping, idx: number) => (
        <FieldPair
          key={`FieldPair_${idx}`}
          name={draftFieldMapping.schema_field}
          providerName={providerName}
          field={draftFieldMapping.schema_field}
          value={draftFieldMapping.mapped_field}
          options={[emptyOption, ...properties]}
          onChange={(event) => {
            const newFields = draftFields.splice(0);
            newFields[idx].mapped_field = event.target.value;
            setDraftFields(newFields);
          }}
        />
      ))}
      <div></div>
      <div className="flex flex-col">
        {/* Full Refresh Checkbox */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Refresh data on save</span>
            <input
              type="checkbox"
              disabled={!canSave}
              checked={shouldFullRefresh}
              className="checkbox"
              onChange={() => {
                setShouldFullRefresh(!shouldFullRefresh);
              }}
            />
          </label>
        </div>

        {/* Save Button */}
        <button
          className="btn btn-primary btn-sm"
          disabled={!canSave}
          onClick={() => {
            trigger({
              type: DATA_MODEL,
              name: objectName,
              field_mappings: draftFields,
            });
            if (shouldFullRefresh) {
              triggerFullRefresh({
                object_type: DATA_MODEL,
                object: objectName.toLowerCase(), // TODO: make API case insensitive
                perform_full_refresh: true,
              });
            }
          }}
        >
          Save
        </button>
      </div>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={message}
      />
    </div>
  );
}
