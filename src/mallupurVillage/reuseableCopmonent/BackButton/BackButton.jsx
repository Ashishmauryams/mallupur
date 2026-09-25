
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import "./BackButton.scss";

const BackButton = ({ label = "Back", path = -1 }) => {
  const navigate = useNavigate();


  return (
    <button
      type="button"
      className="back-button_1"
      onClick={() => navigate(path)}

    >
      <ArrowLeft size={18} />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
