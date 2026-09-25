
import "./TextAreaInput.scss";

const TextAreaInput = ({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    rows = 5,
    required = false,
    error = "",
    disabled = false,
}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>
                {label} {required && <span>*</span>}
            </label>

            <textarea
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                disabled={disabled}
                className={error ? "input-error" : ""}
            />

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default TextAreaInput;

