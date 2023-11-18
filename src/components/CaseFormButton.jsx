import React from "react";
import "./css/case-form-button.css";

const CaseFormButton = ({ handleOpen }) => {
  return (
    <button onClick={handleOpen} className="form-button">
      <span class="circle1"></span>
      <span class="circle2"></span>
      <span class="circle3"></span>
      <span class="circle4"></span>
      <span class="circle5"></span>
      <span class="text">Fill Out The Form</span>
    </button>
  );
};

export default CaseFormButton;
