import "./../styles/register.css";

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  required = false
}) {

  return (

    <div className="input-group">

      <label>{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >

        <option value="">Select</option>

        {options.map((option) => (

<option
  key={option.value}
  value={option.value}
>
  {option.label}
</option>

))}

      </select>

    </div>

  );
}

export default SelectField;