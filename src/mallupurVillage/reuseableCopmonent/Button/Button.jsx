import React from "react";
import "./Button.scss";

const Button = ({
    text = "Button",
    type = "button",
    onClick,

    height = "60px",
    fontSize = "18px",
    fontWeight = "700",
    width = "100%",

    background = "#299555",
    hoverBackground = "#238548",

    color = "#ffffff",

    loading = false,
    loadingElement = null,

    disabled = false,
    border = "none",

    className = "",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`dynamic-button ${className}`}
            style={{
                "--button-height": height,
                "--button-width": width,
                "--button-weight": fontWeight,
                "--button-font-size": fontSize,
                "--button-background": background,
                "--button-hover-background": hoverBackground,
                "--button-color": color,
                "--button-border": border,
            }}
        >
            {loading ? loadingElement : text}
        </button>
    );
};

export default Button;