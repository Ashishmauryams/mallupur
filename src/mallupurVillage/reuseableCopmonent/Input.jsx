
import "./input.scss";

const Input = ({
    label,
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    required = false,
    minLength,
    rightElement,
    error
}) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}{required && <span style={{ color: "red" }}>*</span>}</label>

            <div className={`input-wrapper`}>
                <input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    minLength={minLength}
                    className={error ? "input-error" : ""}
                />

                {rightElement && (
                    <div className="input-right">
                        {rightElement}
                    </div>
                )}
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Input;

