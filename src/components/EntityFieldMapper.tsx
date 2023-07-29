"use client";

import { useCustomerContext } from "@/hooks/useCustomerContext";
import { DATA_MODEL } from "@/lib/env";
import { getHeadersWithCustomerProvider } from "@/lib/headers";
import { getProviderObjects } from "@/lib/provider_objects";
import { EntityMapping } from "@/types/supaglue";
import { ChangeEventHandler, useEffect, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import FieldMappingLabel from "./FieldMappingLabel";
import FieldPair from "./FieldPair";
import { Toast } from "./Toast";

function EntityObjectSelector({
  value,
  providerName,
  onChange,
}: {
  value: string;
  providerName: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  const providerObjects = getProviderObjects(providerName);
  return (
    <div className="form-control w-full max-w-xs mb-6">
      <label className="label">
        <span className="label-text">Pick your {providerName} object</span>
      </label>
      <select
        value={value ?? ""}
        className="select select-bordered"
        onChange={onChange}
      >
        {[
          "",
          providerObjects.map((providerObject) => (
            <option key={providerObject} value={providerObject}>
              {providerObject}
            </option>
          )),
        ]}
      </select>
    </div>
  );
}

export function EntityFieldMapper({
  entityMapping,
  providerName,
}: {
  entityMapping: EntityMapping;
  providerName: string;
}) {
  const [message, setMessage] = useState("Saved.");
  const [showToast, setShowToast] = useState(false);
  const [shouldFullRefresh, setShouldFullRefresh] = useState(false);
  const [selectedObject, setSelectedObject] = useState(
    entityMapping.object.name
  );
  const [canSave, setCanSave] = useState(false);
  const [draftFieldMappings, setDraftFieldMappings] = useState(
    entityMapping.field_mappings.splice(0)
  );
  const activeCustomer = useCustomerContext();

  const { data: propertiesResponse = { properties: [] } } = useSWR(
    `/api/fetch-properties?name=${selectedObject}&type=standard`,
    (url) =>
      fetch(url, {
        method: "GET",
        headers: getHeadersWithCustomerProvider(
          activeCustomer.id,
          providerName
        ),
      }).then((res) => res.json())
  );

  /**
   * Use SWR Mutation to allow your customers to save their field mappings to your schema.
   * This edge function will hit api/save-field-mappings/route.ts.
   */
  const { trigger, error, data } = useSWRMutation(
    `/api/save-entity-mappings`,
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
    const hasAllFieldsMapped = !draftFieldMappings.some(
      (draftFieldMapping) =>
        draftFieldMapping.mapped_field === "" ||
        draftFieldMapping.mapped_field === undefined
    );
    setCanSave(hasAllFieldsMapped);
  }, [draftFieldMappings]);

  const emptyOption = { id: "", label: "" };

  return (
    <div>
      <EntityObjectSelector
        value={selectedObject}
        providerName={providerName}
        onChange={(event) => {
          setSelectedObject(event.target.value);
        }}
      />

      <div className="grid grid-cols-2 gap-4">
        <FieldMappingLabel providerName={providerName} />
        {draftFieldMappings.map((draftFieldMapping, idx: number) => (
          <FieldPair
            key={`FieldPair_${idx}`}
            name={draftFieldMapping.entity_field}
            providerName={providerName}
            field={draftFieldMapping.entity_field}
            value={draftFieldMapping.mapped_field}
            options={[emptyOption, ...propertiesResponse.properties]}
            onChange={(event) => {
              const newFieldMappings = draftFieldMappings.splice(0);
              newFieldMappings[idx].mapped_field = event.target.value;
              setDraftFieldMappings(newFieldMappings);
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
                entity_id: entityMapping.entity_id,
                object: {
                  type: "standard",
                  name: selectedObject,
                },
                field_mappings: draftFieldMappings,
              });
              if (shouldFullRefresh) {
                triggerFullRefresh({
                  object_type: DATA_MODEL,
                  object: entityMapping.entity_name.toLowerCase(),
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
    </div>
  );
}
