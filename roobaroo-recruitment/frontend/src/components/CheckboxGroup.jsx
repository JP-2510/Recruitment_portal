import "../styles/register.css";

function CheckboxGroup({
  label,
  options,
  selectedOptions,
  onChange,
}) {
  return (
    <div className="checkbox-group">

      <label>{label}</label>

      <div className="checkbox-grid">

        {options.map((option) => (

          <label
            key={option}
            className="checkbox-item"
          >

            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={onChange}
            />

            <span>{option}</span>

          </label>

        ))}

      </div>

    </div>
  );
}

export default CheckboxGroup;