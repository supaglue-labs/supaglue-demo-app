export function FieldMappers({
  fields,
}: {
  fields: { developerField: string; customerField: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <label className="label">
        <span className="label-text">Developer Field</span>
      </label>
      <label className="label">
        <span className="label-text">Customer Field</span>
      </label>
      <input
        type="text"
        disabled={true}
        className="input input-bordered w-full max-w-xs"
        defaultValue={"description"}
      />
      <select className="select w-full max-w-xs">
        <option disabled defaultValue="Homer">
          Pick your favorite Simpson
        </option>
        <option>Homer</option>
        <option>Marge</option>
        <option>Bart</option>
        <option>Lisa</option>
        <option>Maggie</option>
      </select>
    </div>
  );
}
