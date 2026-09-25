
import React from "react";
import { SearchX } from "lucide-react";
import "./NotFound.scss";

const NotFound = ({
    message = "Data not found",
    position = "center",
}) => {
    return (
        <div className={`not-found not-found-${position}`}>
            <SearchX size={45} strokeWidth={1.5} />

            <p>{message}</p>
        </div>
    );
};

export default NotFound;

