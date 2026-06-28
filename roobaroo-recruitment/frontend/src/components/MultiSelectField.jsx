import Select from "react-select";

function MultiSelectField({
  label,
  options,
  value,
  onChange,
}) {

  return (
    <div className="input-group multi-select-group">

      <label>{label}</label>

      <Select
        options={options}
        value={value}
        onChange={onChange}
        isMulti
        closeMenuOnSelect={false}
        placeholder="Select one or more verticals..."
        classNamePrefix="react-select"
      />

    </div>
  );
}

export default MultiSelectField;