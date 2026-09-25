
import "./SelectInput.scss";

const SelectInput = ({
    label,
    name,
    value,
    onChange,
    options = [],
    placeholder = "Select an option",
    required = false,
    error = "",
    disabled = false,
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>
                {label} {required && <span>*</span>}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className={error ? "input-error" : ""}
            >
                <option value="">{placeholder}</option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SelectInput;
