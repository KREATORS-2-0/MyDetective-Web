import React from "react";
import "./css/case-form-button.css";

const CaseFormButton = ({ handleOpen }) => {
  return (
    <button onClick={handleOpen} className="form-button">
      Submit The Form Here
    </button>
  );
};

export default CaseFormButton;
