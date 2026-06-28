import "./../styles/register.css";

function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false
}) {
  return (
    <div className="input-group">

      <label>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />

    </div>
  );
}

export default InputField;