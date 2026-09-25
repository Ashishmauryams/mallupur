
import React from "react";
import { CircleAlert } from "lucide-react";
import "./ErrorMessage.scss";

const ErrorMessage = ({
    message = "Something went wrong. Please try again.",
    position = "center",
}) => {
    return (
        <div className={`error-message error-message-${position}`}>
            <CircleAlert size={45} strokeWidth={1.8} />

            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;

