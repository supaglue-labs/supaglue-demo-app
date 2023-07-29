"use client";

import { ChangeEventHandler } from "react";

export default function FieldPair({
  field,
  value,
  providerName,
  options = [],
  onChange,
  disabled = false,
}: {
  name: string;
  field?: string;
  value?: string;
  providerName: string;
  options: { id: string; label: string }[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
}) {
  return (
    <>
      <input
        type="text"
        disabled={true}
        className="input input-bordered w-full max-w-xs"
        defaultValue={field}
      />
      <div className="tooltip">
        <select
          className="select w-full max-w-xs"
          onChange={onChange}
          disabled={disabled}
          value={value ?? ""}
        >
          <option disabled>{providerName} field</option>
          {options
            .sort((a, b) => {
              return ("" + a.label).localeCompare(b.label);
            })
            .map((option, idx: number) => (
              <option key={option.id} value={option.id} data-idx={idx}>
                {option.label} ({option.id ? option.id : "Select a field"})
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
