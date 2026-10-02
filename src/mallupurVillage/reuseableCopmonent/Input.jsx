import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
    leftIcon,
    rightElement,
    error,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    const inputType = isPassword
        ? showPassword
            ? "text"
            : "password"
        : type;

    return (
        <div className="input-groups">

            <label htmlFor={name}>
                {label}

                {required && (
                    <span className="required-star">*</span>
                )}
            </label>

            <div
                className={`input-wrapper ${leftIcon ? "has-left-icon" : ""
                    } ${isPassword ? "has-right-icon" : ""}`}
            >

                {/* LEFT ICON */}
                {leftIcon && (
                    <div className="input-left">
                        {leftIcon}
                    </div>
                )}

                <input
                    id={name}
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    minLength={minLength}
                    className={error ? "input-error" : ""}
                />

                {/* PASSWORD EYE */}
                {isPassword && (
                    <button
                        type="button"
                        className="input-password-toggle"
                        onClick={() =>
                            setShowPassword((prev) => !prev)
                        }
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={22} />
                        ) : (
                            <Eye size={22} />
                        )}
                    </button>
                )}

                {/* EXISTING RIGHT ELEMENT */}
                {!isPassword && rightElement && (
                    <div className="input-right">
                        {rightElement}
                    </div>
                )}

            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

        </div>
    );
};

export default Input;