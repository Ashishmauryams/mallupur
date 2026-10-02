import React from "react";
import { LoaderCircle } from "lucide-react";
import "./Loader.scss";

const Loader = ({ size = 20, color = "currentColor" }) => {
    return (
        <LoaderCircle
            className="loader"
            size={size}
            color={color}
        />
    );
};

export default Loader;